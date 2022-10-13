const Project = require('../models/projectModel');

//Create User
exports.createProject = async (req, res) => {
    try {
        const data = req.body;
        data.admin = req.payload._id;
        const newProject = new Project(data);
        const project = await newProject.save();
        //Response Data 
        res.status(201).json({
            status: "success",
            data: {
                project: project,
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}

exports.getProject = async (req, res) => {
    try {
        const data = req.body;
        const userId = req.payload._id;
        const result = await Project.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "admin",
                    foreignField: "_id",
                    as: "admin",
                },
            },
            {
                $unwind: {
                    path: "$admin",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "members",
                },
            },
            {
                $unwind: {
                    path: "$members",
                    preserveNullAndEmptyArrays: true,
                },
            }, {
                $group: {
                    _id: "$_id",
                    root: {
                        $mergeObjects: "$$ROOT",
                    },
                    members: {
                        $push: "$members",
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: ["$root", "$$ROOT"],
                    },
                },
            },
            {
                $project: {
                    root: 0,
                },
            }
        ]);
        //Response Data 
        console.log(result);
        res.status(201).json({
            status: "success",
            data: {
                project: result,
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}
