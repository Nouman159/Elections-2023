const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

const Constituency = require('../Models/constituency');

exports.constituency_create = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct name"),
    body('city')
        .notEmpty()
        .withMessage('City is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('City name can only contain letters, spaces, hyphens, and apostrophes.'),
    body('area')
        .notEmpty()
        .withMessage('Area is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('City name can only contain letters, spaces, hyphens, and apostrophes.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const constituency = await Constituency.findOne({ name: req.body.name });
        if (constituency) {
            return res.status(400).json({ message: 'Constituency with that name already exists' });
        }
        const newConstituency = new Constituency({
            name: req.body.name,
            city: req.body.city,
            area: req.body.area
        })
        await newConstituency.save();
        return res.status(200).json({ message: 'success' });
    })
]