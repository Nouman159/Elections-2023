const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

const Constituency = require('../Models/constituency');

exports.constituency_create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct name"),
    body('city')
        .notEmpty()
        .withMessage('City is required.')
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct city")
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('City name can only contain letters, spaces, hyphens, and apostrophes.'),
    body('area')
        .notEmpty()
        .withMessage('Area is required.')
        .isLength({ min: 3 })
        .escape()
        .withMessage("Specify correct area")
        .matches(/^[a-zA-Z0-9\s'-]+$/)
        .withMessage('City name can only contain letters, spaces, hyphens, and apostrophes.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const constituency = await Constituency.findOne({ name: req.body.name });
        if (constituency) {
            return res.status(400).json({ error: 'Constituency with that name already exists' });
        }
        const constituency2 = await Constituency.findOne({ area: req.body.area });
        if (constituency2) {
            return res.status(400).json({ error2: 'Constituency with that area already exists' });
        }
        console.log('Hello');
        try {
            console.log(req.body);
            const newConstituency = new Constituency({
                name: req.body.name,
                city: req.body.city,
                area: req.body.area
            })
            console.log('Hello 1');
            await newConstituency.save();
            console.log('Hello 2');
            return res.status(200).json({ message: 'success' });
        } catch {
            console.log('Hello 2');
            return res.status(400).json({ message: 'Try later' });
        }
    })
]