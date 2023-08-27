const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const Admin = require('../Models/admin');
const Constituency = require('../Models/constituency');
const Candidate = require('../Models/candidateRequests');
const Party = require('../Models/party');

const { adminJwtSecret } = require('../config');

// Sign Up
exports.admin_create = [
    body('username')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct username")
        .isAlphanumeric()
        .withMessage("username should not have non-alphanumeric characters"),
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    asyncHandler(async (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        const user = await Admin.findOne({ email: req.body.email });
        if (user) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Email already used',
                path: 'email',
                location: 'body',
            })
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);
            const admin = new Admin({
                username: req.body.username,
                email: req.body.email,
                password: secPassword
            })
            await admin.save();
        } catch (err) {
            return res.status(400).json({ message: 'false' });
        }
        return res.status(200).json({ message: 'success' });
    })
]
//Login
exports.admin_login = [
    body('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email format.'),
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin)
            return res.status(400).json({ err: "User not found" });
        const pwdCompare = await bcrypt.compare(req.body.password, admin.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }
        const adminToken = jwt.sign({
            data: admin.id
        }, adminJwtSecret, { expiresIn: '12h' });
        return res.status(200)
            .cookie("adminToken", adminToken, { httpOnly: true, withCredentials: true })
            .json({ admin: true, "adminId": admin._id });
    })
]

exports.dashboard_info = [
    async (req, res) => {
        try {
            const [numCandidates, numConstituencies, numParties] = await Promise.all([
                Candidate.countDocuments({ status: "candidate" }).exec(),
                Constituency.countDocuments({}).exec(),
                Party.countDocuments({}).exec(),
            ]);
            return res.status(200).json({ numCandidates, numConstituencies, numParties });
        } catch (err) {
            return res.status(400).json({ success: 'false' });
        }

    }
]