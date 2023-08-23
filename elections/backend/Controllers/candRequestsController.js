const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

const candRequest = require('../Models/candidateRequests');
const Party = require('../Models/party');
const Constituency = require('../Models/constituency');
const Voter = require('../Models/voter');

exports.candidate_request = [
    body('description')
        .isLength({ min: 8 }).withMessage("Description must be at least 8 characters long"),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const voterId = req.params.id;
        const request = await candRequest.findOne({ voter: voterId });
        if (request) {
            return res.status(409).json({ error: 'Request already in queue' });
        }
        try {
            const newRequest = new candRequest({
                voter: voterId,
                constituency: req.body.constituency,
                party: req.body.party,
                description: req.body.description
            });
            await newRequest.save();
            return res.status(200).json({ message: 'success' });
        } catch {
            return res.status(400).json({ message: 'failed' });
        }
    })
];

exports.request_data = [
    asyncHandler(async (req, res, next) => {
        try {

            const parties = await Party.find().sort({ partyname: 1 });
            if (!parties) {
                return res.status(400).json({ message: "Parties not found" });
            }
            const constituencies = await Constituency.find().sort({ name: 1 });
            if (!constituencies) {
                return res.status(400).json({ message: "Constituencies not found" });
            }
            return res.status(200).json({ parties: parties, constituencies: constituencies });
        }
        catch (err) {
            return res.status(404);
        }
    })
]

exports.get_candidate_requests = [
    asyncHandler(async (req, res) => {
        try {
            const requests = await candRequest.find({ status: 'pending' }).populate('voter', 'name');
            if (!requests)
                return res.status(404).json({ message: "No requests yet" });
            return res.status(200).json({ message: "success", requests: requests });

        } catch {
            return res.status(400).json({ message: "failed" });
        }
    })
]

exports.candidate_approved = [
    asyncHandler(async (req, res) => {
        const { requestId } = req.params;
        try {
            const request = await candRequest.findOne({ _id: requestId });
            if (!request) {
                return res.status(404).json({ message: "No such request" });
            }
            request.status = 'candidate';
            await request.save();
            const voterChange = await Voter.findOne({ _id: request.voter });
            voterChange.isCandidate = true;
            await voterChange.save();
            return res.status(200).json({ message: "success" });
        } catch {
            return res.status(400).json({ message: "failed" });
        }
    })
]

exports.candidate_rejected = [
    asyncHandler(async (req, res) => {
        const { requestId } = req.params;
        try {
            const request = await candRequest.deleteOne({ _id: requestId });
            if (request.deletedCount === 1)
                return res.status(200).json({ message: "success" });
            return res.status(404).json({ message: "No such request" });
        } catch {
            return res.status(400).json({ message: "failed" });
        }
    })
]

exports.candidate_names = [
    async (req, res) => {
        try {

            const { voterId } = req.params;
            const voterConstituency = await Voter.findOne({ _id: voterId }, 'constituency');
            const constituency = voterConstituency.constituency;
            const newConstituency = await Constituency.findOne({ _id: constituency }, 'name');
            const candidateLists = await candRequest.find({ status: 'candidate', constituency: newConstituency.name }, 'voter party').populate('voter', 'name');
            return res.status(200).json({ list: candidateLists });
        } catch (err) {

            return res.json(400).json({ error: 'true' });
        }
    }
]

exports.candidate_profile = [
    async (req, res) => {
        try {

            const { candidateId } = req.params;
            const profile = await candRequest.findOne({ status: 'candidate', _id: candidateId }).populate('voter', 'name email');
            return res.status(200).json({ profile: profile });
        } catch {
            return res.status(400).json({ error: 'true' });
        }
    }
]

exports.is_candidate = [
    async (req, res) => {
        try {
            const { voterId } = req.params;
            const candidate = await candRequest.findOne({ voter: voterId, status: 'candidate' });
            if (candidate)
                return res.status(200).json({ isCandidate: 'true' });
            return res.status(200).json({ isCandidate: 'false' });
        } catch {
            return res.status(400).json({ failed: 'true' });
        }
    }
]

exports.voters_list = [
    async (req, res) => {
        try {
            const { candidateId } = req.params;
            const constituency = await candRequest.findOne({ _id: candidateId, status: 'candidate' }, 'constituency');
            const newConstituency = constituency.constituency;
            const constituencyId = await Constituency.findOne({ name: newConstituency }, '_id')
            const id = constituencyId._id;
            const votersList = await Voter.find({ constituency: id }, 'name email');
            if (votersList)
                return res.status(200).json({ voters: votersList });
            return res.status(404);
        } catch {
            return res.status(400).json({ failed: 'true' });
        }
    }
]

exports.pending_requests = [
    async (req, res) => {
        try {
            const pendingCount = await candRequest.countDocuments({ status: 'pending' });
            return res.status(200).json({ count: pendingCount });
        } catch {
            return res.status(400).json({ failed: 'true' });
        }
    }
]

exports.check_status = [
    async (req, res) => {
        try {
            const { voterId } = req.params;
            const request = await candRequest.findOne({ voter: voterId }, 'status')
            if (!request)
                return res.status(200).json({ data: { status: 'voter' } });
            return res.status(200).json({ data: request });
        } catch {
            return res.status(400).json({ failed: 'true' });
        }
    }
]