const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        trim: true,
        maxlength: [20, 'Name must have less than or equal than 10 characters'],
        minlength: [2, 'Name must have more than or equal than 10 characters']
    },
    logo: {
        type: String,
        trim: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    created_by: {
        type: String,
    }
});
const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

