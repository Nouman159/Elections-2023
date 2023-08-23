const _ = require('lodash');

const Election = require('../Models/elections');
const Vote = require('../Models/vote');
const Constituency = require('../Models/constituency');

exports.elections_result = async (req, res) => {
    try {
        const { electionId } = req.params;
        const election = await Election.findOne({ _id: electionId });
        if (!election) {
            return res.status(404).json({ success: false, error: "Election not found." });
        }

        const constituencies = await Constituency.find({}, '_id name');

        const votingResults = await Vote.find({ election: electionId }, 'voterCount isWinner')
            .populate({
                path: 'candidaterequests',
                populate: {
                    path: 'voter',
                    select: 'name -_id'
                },
                select: '-description -status -__v'
            });

        const groupedResults = _.groupBy(votingResults, result => {
            const constituencyId = result.candidaterequests.constituency ? result.candidaterequests.constituency.toString() : '';
            const matchingConstituency = constituencies.find(con => con.name.toString() === constituencyId);
            return matchingConstituency ? matchingConstituency.name : 'Unknown Constituency';
        });

        const winners = {};
        for (const constituency in groupedResults) {
            const candidates = groupedResults[constituency];
            const winner = _.maxBy(candidates, 'voterCount');

            candidates.forEach(candidate => {
                candidate.isWinner = candidate === winner ? "true" : "false";
                const handleChange = async () => {
                    await Vote.findByIdAndUpdate(candidate._id, { isWinner: candidate.isWinner });
                }
                handleChange();
            });

            winners[constituency] = candidates;
        }


        return res.status(200).json({ success: 'true', result: winners });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ success: 'false' });
    }
};
