let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');


let userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'please provide username'],
        min : [2, 'username cannot be less than 2 characters'],
        max : [20, 'username cannot exceed 20 characters'],
        unique : [true, 'This username is taken, please provide another']
    },
    email: {
        type: String,
        required : [true, 'please provide an email'],
        unique : [true, 'email already in use']
    },
    password : {
        type : String,
        min : [2, 'password cannot be less than 2 characters'],
        required : [true, 'please provide password'],
        unique : [true, 'password should be unique']
    },
}, { timestamps : true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return; 

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (incomingPassword) {
    let isMatch = await bcrypt.compare(incomingPassword, this.password);
    return isMatch;
};


module.exports = mongoose.model('User', userSchema);