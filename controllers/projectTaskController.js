const Task = require('../models/projectTaskModel');
const ProjectTask = require('../models/projectTaskModel');
const mongoose = require("mongoose");
const Project = require('../models/projectModel');

//Create User
exports.createTask = async (req, res) => {
    try {
        const data = req.body;
        data.created_by = req.payload._id;
        data.created_at = new Date().toISOString();
        const task = new Task(data);
        const result = await task.save();
        //Response Data 
        res.status(201).json({
            status: "success",
            data: {
                task: result,
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

exports.getProjectTask = async (req, res) => {
    try {
        const data = req.params.id;
        const userId = req.payload._id;
        const isAdmin = await Project.find({ _id: mongoose.Types.ObjectId(req.params.id), admin: mongoose.Types.ObjectId(req.payload._id) });
        let where = {
            project_id: mongoose.Types.ObjectId(req.params.id),
        };
        if (isAdmin.length == 0) {
            where.created_by = mongoose.Types.ObjectId(req.payload._id);
        }

        const result = await ProjectTask.aggregate([
            {
                $match: where
            },
            {
                $lookup: {
                    from: "users",
                    localField: "created_by",
                    foreignField: "_id",
                    as: "created_by",
                },
            },
            {
                $unwind: {
                    path: "$created_by",
                    preserveNullAndEmptyArrays: true,
                },
            },

            {
                $lookup: {
                    from: "projects",
                    localField: "project_id",
                    foreignField: "_id",
                    as: "project",
                },
            },
            {
                $unwind: {
                    path: "$project",
                    preserveNullAndEmptyArrays: true,
                },
            }
        ]);

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

exports.updateTask = async (req, res) => {
    try {
        let canUpdate = false;
        const projectTask = await ProjectTask.find({ _id: mongoose.Types.ObjectId(req.params.id)});
        const isAdmin = await Project.find({ _id: mongoose.Types.ObjectId(projectTask[0].project_id), admin: mongoose.Types.ObjectId(req.payload._id) });
        if( projectTask[0].project_id == req.payload._id || isAdmin.length) {
            canUpdate= true;
        }

        if(req.body.status == 2){
            req.body.completed_at = new Date().toISOString();
        }

        if(canUpdate) {
            const result = await ProjectTask.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                setDefaultsOnInsert: true,
                context: 'query',
            });
            res.status(201).json({
                status: "success",
                data: {
                    taskUpdate: result,
                }
            });
        } else {
            res.status(400).json({
                status: 'Failed',
                message: 'Can not update this task.'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
}