const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: [true, "Enter patient name"]
    // },
    phone: {
        type: String,
        required: [true, "Enter your phone number"],
        unique: true
    },
    report: [
        {
            status: {
                type: String,
                required: true,
                enum: ["Negative", "Travelled-Quarantine", "Symptoms-Quarantine", "Positive-Admit"]
            },
            date: {
                type: Date,
                required: true
            }
        }
    ],
    // patient take advise from different doctor so it also use array of object
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
}, {
    timestamps: true
})

const Patient = new mongoose.model('Patient', patientSchema);

module.exports = Patient;