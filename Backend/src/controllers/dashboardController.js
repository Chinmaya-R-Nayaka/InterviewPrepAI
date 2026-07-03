const asyncHandler = require("../utils/asyncHandler");
const Problem = require("../models/Problem");

const getDashboard = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const stats = await Problem.aggregate([

        {
            $match: {
                user: userId
            }
        },

        {
            $group: {

                _id: null,

                totalProblems: {
                    $sum: 1
                },

                solved: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Solved"] },
                            1,
                            0
                        ]
                    }
                },

                attempted: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Attempted"] },
                            1,
                            0
                        ]
                    }
                },

                todo: {
                    $sum: {
                        $cond: [
                            { $eq: ["$status", "Todo"] },
                            1,
                            0
                        ]
                    }
                },

                easy: {
                    $sum: {
                        $cond: [
                            { $eq: ["$difficulty", "Easy"] },
                            1,
                            0
                        ]
                    }
                },

                medium: {
                    $sum: {
                        $cond: [
                            { $eq: ["$difficulty", "Medium"] },
                            1,
                            0
                        ]
                    }
                },

                hard: {
                    $sum: {
                        $cond: [
                            { $eq: ["$difficulty", "Hard"] },
                            1,
                            0
                        ]
                    }
                }

            }

        }

    ]);

    const today = new Date();
    today.setHours(0,0,0,0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate()+1);

    const revisionToday = await Problem.countDocuments({

        user:userId,

        revisionDate:{

            $gte:today,

            $lt:tomorrow

        }

    });

    res.status(200).json({

        success:true,

        dashboard:{

            ...(stats[0] || {

                totalProblems:0,

                solved:0,

                attempted:0,

                todo:0,

                easy:0,

                medium:0,

                hard:0

            }),

            revisionToday

        }

    });

});

module.exports = {

    getDashboard

};