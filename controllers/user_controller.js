const Doctor = require('../models/doctor');
const Patient = require('../models/patient');
const jwt = require('jsonwebtoken');

module.exports.registerDoctor = async (req, res)=>{
    try{
        // check if user already exist or not
        const user = await Doctor.findOne({name: req.body.name});
        if(!user){
            const doctor = await Doctor.create(req.body);
    
            if(doctor){
                console.log("new doctor created", doctor);
                return res.status(200).json({
                    success: true,
                    message: "doctor created successfully"
                })
            }
        }
        // else{
        //     throw Error
        // }

        return res.status(401).json({
            success: false,
            message: "doctor not created because already exist"
        });

    }catch(err){
        console.log('error in resister doctor', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports.login = async (req, res)=>{
    try{
        const user = await Doctor.findOne(req.body);
        if(user){
            // const token = jwt.sign(user.json(), "secret", {expiresIn: '100000'});
            return res.status(200).json({
                success: true,
                message: "doctor login successfull",
                token: jwt.sign(user.toJSON(), "secret", {expiresIn: '100000'})
            })
        }else{
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            });
        }
    }catch(err){
        console.log('error in doctor login', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports.registerPatient = async (req, res)=>{
    try{
        // check if user already exist or not
        const user = await Patient.findOne({phone: req.body.phone});
        if(!user){
            req.body.doctor = "64428df9a5ff580177d9b04b";
            const patient = await Patient.create(req.body);

            console.log("new patient created", patient);
            return res.status(200).json({
                success: true,
                message: "patient created successfully"
            })
        }else{
            // if patient already exist so return patient info
            return res.status(200).json({
                success: true,
                message: "patient already exist",
                patientInfo: user
            })
        }

        // return res.status(401).json({
        //     success: false,
        //     message: " not created because already exist"
        // });

    }catch(err){
        console.log('error in resister patient', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports.createReport = async (req, res)=>{
    try{
        const patient = await Patient.findById(req.params.id);
        if(patient){
            req.body.date = Date.now();
            patient.report.push(req.body);
            patient.save();
            return res.status(200).json({
                success: true,
                message: "report created successfully"
            })
        }

        return res.status(404).json({
            success: false,
            message: "patient not found so report not create"
        })

    }catch(err){
        console.log('error in create patient report', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports.allReports = async (req, res)=>{
    try{
        const patient = await Patient.findById(req.params.id);
        if(patient){
            return res.status(200).json({
                success: true,
                message: "patient all reports fetch successfully",
                patientReports: patient.report
            })
        }

        return res.status(404).json({
            success: false,
            message: "could not able to fetch patient all reports"
        })

    }catch(err){
        console.log('error in get a patient all reports', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports.allReportsStatus = async (req, res)=>{
    try{
        const patient = await Patient.find({report: {$elemMatch: {status: req.params.status}}});
        if(patient){
            return res.status(200).json({
                success: true,
                message: "fetch all reports of specific status successfully",
                data: patient
            })
        }

        // return res.status(404).json({
        //     success: false,
        //     message: "could not able to fetch patient all reports for specific status"
        // })

    }catch(err){
        console.log('error in fetch all reports specific status', err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}