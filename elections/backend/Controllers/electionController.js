const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const moment = require('moment');

const CheckVoteModel = require('../Models/voteCheck');
const Election = require('../Models/elections');
const Voter = require('../Models/voter');
const Vote = require('../Models/vote');
const Constituency = require('../Models/constituency');
const Candidate = require('../Models/candidateRequests');

exports.election_create = [
    body('name').notEmpty().withMessage('Name is required')
        .isLength({ min: 5 })
        .withMessage('Name should be at least 5 characters'),
    body('electionDate')
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('Invalid election date format (YYYY-MM-DD)'),
    body('startTime')
        .custom((value) => {
            if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
                throw new Error('Value must be time with HH:MM format');
            }
            return true;
        }),
    body('endTime')
        .custom((value) => {
            if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(value)) {
                throw new Error('Value must be time with HH:MM format');
            }
            return true;
        }),
    async (req, res) => {
        const errors = validationResult(req);
        const { electionDate, startTime, endTime } = req.body;
        const today = new Date();
        const inputDate = new Date(electionDate);
        if (inputDate <= today) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Invalid Election Date',
                path: 'electionDate',
                location: 'body',
            })
        }
        if (endTime <= startTime) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Start time must be before end data',
                path: 'startTime',
                location: 'body',
            })
        }
        const oldElection = await Election.findOne({ name: req.body.name });
        if (oldElection) {
            errors.errors.push({
                type: 'field',
                value: '',
                msg: 'Choose another unique name',
                path: 'name',
                location: 'body',
            })
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newElection = new Election({
            name: req.body.name,
            electionDate: req.body.electionDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        })
        await newElection.save();
        return res.status(200).json({ data: "success" });
    },
];

exports.get_elections = [
    async (req, res) => {
        try {
            const elections = await Election.find();
            return res.status(200).json({ data: elections });
        }
        catch {
            return res.status(400);
        }
    }
]

exports.get_candidates_voting = [
    async (req, res) => {
        try {
            const { voterId } = req.params;
            const voter = await Voter.findOne({ _id: voterId });

            const voterConstituency = voter.constituency;
            const constituency = await Constituency.findOne({ _id: voterConstituency })
            const constituencyName = constituency.name;
            const contestCandidates = await Candidate.find({ constituency: constituencyName }, "_id party constituency").populate('voter', 'name');
            return res.status(200).json({ data: contestCandidates });
        }
        catch {
            return res.status(400);
        }
    }
]

exports.election_info = [
    async (req, res) => {
        try {
            const { electionId } = req.params;
            console.log(electionId);
            const info = await Election.findOne({ _id: electionId }, "name electionDate")
            return res.status(200).json({ data: info });
        }
        catch {
            return res.status(400);
        }
    }
]

exports.checkTime = [
    async (req, res, next) => {
        const { electionId } = req.params;
        const { electionDate, startTime, endTime } = await Election.findOne({ _id: electionId }, "electionDate startTime endTime");
        const currentTime = moment().format('HH:mm');
        const electionDat = moment(electionDate).format('YYYY-MM-DD');
        const currentDateTime = new Date();
        const currentDate = moment(currentDateTime).format('YYYY-MM-DD');
        const errors = [];
        let date1 = new Date(currentDate).getTime();
        let date2 = new Date(electionDat).getTime();
        const delay = {
            currentDate: currentDate,
            currentTime: currentTime,
            electionDate: electionDat,
            startTime: startTime,
            endTime: endTime
        }
        if (date1 === date2) {
            if ((currentTime >= startTime) && (currentTime <= endTime)) {
                return res.status(200).json({ success: 'true' });
            }
            else if (currentTime < startTime) {
                return res.status(400).json({ delay: delay });
            }
            else if (currentTime > endTime)
                return res.status(400).json({ completed: 'Voting completed' });
        }
        else if (date1 > date2)
            return res.status(400).json({ completed: 'Voting completed' });
        else
            return res.status(400).json({ delay: delay });
    }
]

exports.view_vote_duplicate = [
    async (req, res, next) => {
        const { electionId, voterId } = req.params;
        const viewVote = await CheckVoteModel.findOne({ election: electionId, voter: voterId })
        if (viewVote) {
            const errors = [];
            errors.push({
                path: 'duplicate',
                msg: 'Vote casted already'
            })
            return res.status(400).json({ errors: errors });
        }
        else {
            next();
        }
    }
]

exports.elections_cast_vote = [
    async (req, res) => {
        try {
            const { electionId, voterId, candidateId } = req.params;
            const constituencyId = await Voter.findOne({ _id: voterId }, "constituency");
            const checkVote = await Vote.findOne({ election: electionId, candidaterequests: candidateId, constituency: constituencyId.constituency });
            if (checkVote) {
                console.log('Hello');
                checkVote.voterCount++;
                await checkVote.save();
            } else {
                const newVote = new Vote({
                    election: electionId,
                    candidaterequests: candidateId,
                    voterCount: 1,
                    constituency: constituencyId.constituency
                })
                await newVote.save();
            }
            // const newCheckVote = new CheckVoteModel({
            //     election: electionId,
            //     voter: voterId
            // });

            // await newCheckVote.save();
            return res.status(200).json({ success: 'true' });
        } catch {
            return res.status(400).json({ success: 'false' });

        }
    }
]


