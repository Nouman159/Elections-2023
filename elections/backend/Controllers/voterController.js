const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const Voter = require('../Models/voter');
const Constituency = require('../Models/constituency');
const { voterJwtSecret } = require('../config');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });
// Voter Sign Up
exports.voter_create = [
    upload.single('pic'),
    body('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct name"),
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('cnic').notEmpty().withMessage('CNIC is required.')
        .isLength({ min: 13, max: 15 }).withMessage('Enter valid cnic'),
    asyncHandler(async (req, res) => {
        const user = await Voter.findOne({ email: req.body.email });
        const cnicErr = await Voter.findOne({ cnic: req.body.cnic });
        const constituency = await Constituency.findOne({ name: req.body.constituency });
        const id = constituency._id;
        const errors = validationResult(req);
        if (cnicErr) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'CNIC already used',
                path: 'cnic',
                location: 'body',
            });
        }
        if (user) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Email already used',
                path: 'email',
                location: 'body',
            });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        const voter = new Voter({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            cnic: req.body.cnic,
            constituency: id,
            pic: req.file.filename
        })
        await voter.save();
        return res.status(200).json({ message: 'success' });
    })
]
//Login
exports.voter_login = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const voter = await Voter.findOne({ email: req.body.email })
        if (!voter) {
            return res.status(400).json({ message: "User not found" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, voter.password);
        if (!pwdCompare) {
            return res.status(400).json({ error: "Try logging with correct credentials" });

        }
        const id = voter._id;
        const voterToken = jwt.sign({
            data: voter.id
        }, voterJwtSecret, { expiresIn: '120h' });
        return res
            .status(200)
            .cookie("token", voterToken, { httpOnly: true, withCredentials: true })
            .json({ voter: true, "voterId": id });

        ;
    })
]
//Profile
exports.voter_profile = [
    asyncHandler(async (req, res) => {
        const voterId = req.params.id;
        try {
            const voter = await Voter.findOne({ _id: voterId })
                .populate('constituency', 'name');
            if (!voter) {
                return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).json({ voter: voter });
        }
        catch (err) {
            return res.status(404);
        }
    })
]