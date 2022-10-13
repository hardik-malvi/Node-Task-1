const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const validatePassword = password => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{6,100}$/
    return re.test(password)
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        maxlength: [10, 'Username Name must have less than or equal than 10 characters'],
        minlength: [2, 'Username Name must have more than or equal than 10 characters']
    },

    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],

    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minlength: 6,
        validate: [validatePassword, 'Please fill a valid password'],
    },
    role: {
        type: String,
        default: 'User'
    }
});


//Hash Paasword Genrate
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;

