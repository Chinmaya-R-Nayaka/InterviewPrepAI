const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is required"],
        trim: true,
        minlength : 3,
        maxlength : 20
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : 8
    },
    avatar : {
        type : String,
        default : "",
    },
    streak : {
        type : Number,
        default : 0,
        min : 0
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {timestamps : true});

userSchema.pre("save", async function (next) {
    // If password has not changed, skip hashing
    if(!this.isModified("password")) return; // refers to this.password
    // isModified("field in schema")

    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);;
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
