const { body, validationResult } = require("express-validator");
const _ = require('lodash');

const Election = require('../Models/elections');
const Voter = require('../Models/voter');
const Vote = require('../Models/vote');
const Constituency = require('../Models/constituency');
const candidaterequests = require('../Models/candidateRequests');

exports.elections_result = [
    async (req, res) => {
        try {
            const { electionId } = req.params;
            const election = await Election.findOne({ _id: electionId });
            if (!election) {
                return res.status(404).json({ success: false, error: "Election not found." });
            }
            const constituencies = await Constituency.find({}, '_id name');
            const votingResults = await Vote.find({ election: electionId })
                .populate({
                    path: 'candidaterequests',
                    populate: {
                        path: 'voter',
                        select: 'name'
                    }
                });
            const groupedResults = [];
            for (const constituenc of constituencies) {
                const name = constituenc.name;
                const results = votingResults.filter(result => result.candidaterequests.constituency.toString() === constituenc.name.toString());
                groupedResults.push({ name, results });

            }
            return res.status(200).json({ success: 'true', result: groupedResults });

        } catch (err) {
            console.log(err);
            return res.status(400).json({ success: 'false' });
        }


    }
]