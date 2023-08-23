const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const Party = require('../Models/party');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'symbol');
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

exports.party_create = [
    upload.single('symbol'),
    body('leadername')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Enter valid name"),
    body('partyname')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Enter valid name"),
    body('abbreviation')
        .trim()
        .notEmpty()
        .withMessage('Abbreviation is required.')
        .isLength({ min: 2, max: 10 })
        .withMessage('Abbreviation must be between 2 and 10 characters.'),
    body('foundedYear')
        .notEmpty().withMessage('Founded Year is required.')
        .isInt({ min: 1700, max: 2023 }).withMessage('Enter Valid Year'),
    body('ideology')
        .notEmpty()
        .withMessage('Idelogy is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('Special characters not allowed'),
    body('description')
        .notEmpty()
        .withMessage('Description is required.'),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        const party = await Party.findOne({ partyname: req.body.partyname });
        if (party) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Party with that name already exists',
                path: 'partynameError',
                location: 'body',
            });
        }
        const party2 = await Party.findOne({ abbreviation: req.body.abbreviation })
        if (party2) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Enter unique abbreviation. Already exists',
                path: 'abbreviation',
                location: 'body',
            });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newParty = new Party({
                partyname: req.body.partyname,
                partyleader: req.body.leadername,
                abbreviation: req.body.abbreviation,
                ideology: req.body.ideology,
                symbol: req.file.filename,
                description: req.body.description,
                foundedYear: req.body.foundedYear
            })
            await newParty.save();
            return res.status(200).json({ message: 'success' });
        }
        catch {
            return res.status(400).json({ failed: 'denied' });
        }
    })
]