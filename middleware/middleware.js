const User = require('../models/userModel');
const Project = require('../models/projectModel');
const ProjectTasks = require('../models/projectTaskModel');

const mongoose = require("mongoose");

exports.uniqueUsernameandemailcheck = async (req, res, next) => {
  const data = req.body;
  const username = await User.find({ $or: [{ username: data.username }, { email: data.email }] })
  if (username.length > 0) {
    const resArr = {
      "user": [],
      "status_code": 400,
      "message": {
        "name": "Username Or Email Already Exits"
      }
    }
    res.status(400).json(resArr);
  } else {
    next();
  }
}

exports.uniqueProjectNameCheck = async (req, res, next) => {
  const data = req.body;
  const projectname = await Project.find({ name: data.name });
  if (projectname.length > 0) {
    const resArr = {
      "project": [],
      "status_code": 400,
      "message": {
        "name": "Project Name A lready Exits"
      }
    }
    res.status(400).json(resArr);
  } else {
    next();
  }
}

exports.memberAdminCheck = async (req, res, next) => {
  const data = req.body;
  const userId = req.payload._id;
  const isMemberAdmin = await Project.find({ $and: [{ _id: mongoose.Types.ObjectId(data.project_id) }, { members : { "$in": mongoose.Types.ObjectId(userId) }}] });
  if (isMemberAdmin.length == 0) {
    const resArr = {
      "project": [],
      "status_code": 400,
      "message": {
        "name": "Not a Member of this Project"
      }
    }
    res.status(400).json(resArr);
  } else {
    next();
  }
}
