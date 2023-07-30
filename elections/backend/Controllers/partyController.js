const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const Party = require('../Models/party');

const storage = multer.diskStorage({
    designation: function (req, file, cb) {
        cb(null, 'parties');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['parties/jpeg', 'parties/png', 'parties/jpg'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });

exports.party_create = [
    body('leadername')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Enter valid name")
        .matches(/^[a-zA-Z's]+$/)
        .withMessage('Leader name can only contain letters only'),
    body('partyname')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Enter valid name")
        .matches(/^[a-zA-Z's-]+$/)
        .withMessage('Party name can only contain letters only'),
    body('abbreviation')
        .trim()
        .notEmpty()
        .withMessage('Abbreviation is required.')
        .isLength({ min: 2, max: 10 })
        .withMessage('Abbreviation must be between 2 and 10 characters.')
        .matches(/^[A-Z-\s]+$/).withMessage('Abbreviation can only contain uppercase letters and hyphens.'),
    body('year')
        .notEmpty().withMessage('Year is required.')
        .isInt({ min: 1000, max: 9999 }).withMessage('Year must be a four-digit number.'),
    body('ideology')
        .notEmpty()
        .withMessage('Idelogy is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('Special characters not allowed'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('Special characters not allowed'),
    upload.single('photo'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const party = await Party.findOne({ partyname: req.body.partyname });
        if (party) {
            return res.status(400).json({ message: 'Party with that name already exists' });
        }
        party = await Party.findOne({ abbreviation: req.body.abbreviation })
        if (party) {
            return res.status(400).json({ message: 'Party with that name already exists' });
        }
        const newParty = new Party({
            partyname: req.body.partyname,
            leadername: req.body.leadername,
            abbreviation: req.body.abbreviation,
            ideology: req.body.ideology,
            symbol: req.file.filename,
            description: req.body.description,
        })
        await newConstituency.save();
        return res.status(200).json({ message: 'success' });
    })
]