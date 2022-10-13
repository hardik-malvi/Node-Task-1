const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectTaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Deacription is required"],
        trim: true,
        maxlength: [500, 'Name must have less than or equal than 10 characters'],
        minlength: [2, 'Name must have more than or equal than 10 characters']
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    completed_at: {
        type: String,
        default: null
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    created_at: {
        type: String
    },
    status: {
        type: Number,
        default: 0 // 0- pending, 1- in progress, 2- completed
    }
});
const ProjectTask = mongoose.model('ProjectTask', projectTaskSchema);
module.exports = ProjectTask;

