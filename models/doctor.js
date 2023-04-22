const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Your Name"],
        unique: true
    },
    // doctor name or password may be same but email is unique
    // email: {
    //     type: String,
    //     required: [true, "Enter Your Email"],
    //     unique: true
    // },
    password: {
        type: String,
        required: [true, "Enter Your Password"]
    }
}, {
    timestamps: true
})

// create collection
const Doctor = new mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;