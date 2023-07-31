const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const Admin = require('../Models/admin');

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
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
        .custom(value => {
            const commonPasswords = ['password', '123456', 'qwerty', 'abcdef'];
            if (commonPasswords.includes(value.toLowerCase())) {
                throw new Error('Please choose a stronger password.');
            }
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User with that email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        const admin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: secPassword
        })
        await admin.save();
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
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
        .custom(value => {
            const commonPasswords = ['password', '123456', 'qwerty', 'abcdef'];
            if (commonPasswords.includes(value.toLowerCase())) {
                throw new Error('No such data');
            }
            return true;
        }),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const admin = await Admin.findOne({ email: req.body.email })
        const pwdCompare = await bcrypt.compare(req.body.password, admin.password);
        if (!admin) {
            return res.status(400).json({ message: "User not found" });
        }
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });

        }
        const adminToken = jwt.sign({
            data: admin.id
        }, adminJwtSecret);
        return res.status(200).json({ admin: true, adminToken: adminToken });
    })
]