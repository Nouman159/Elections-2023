const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const candRequest = require('../Models/candidateRequests');


exports.candidate_request = [
    body('constituency').isMongoId().withMessage('Invalid reference of constituency'),
    body('voter').isMongoId().withMessage('Invalid reference of voter'),
    body('party').isMongoId().withMessage('Invalid reference of party'),
    body('description')
        .notEmpty().withMessage('Description is required.')
        .matches(/^[a-zA-Z0-9\s'-]+$/).withMessage('Special characters not allowed'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const voterId = req.body.voter;
        const request = await candRequest.findById({ voter: voterId });
        if (request) {
            return res.status(400).json({ message: 'Request already in queue' });
        }
        const newRequest = new candRequest({
            voter: req.body.voter,
            constituency: req.body.constituency,
            party: req.body.party,
            description: req.body.description
        })
        await newRequest.save();
        return res.status(200).json({ message: 'success' });
    })
]
