const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'Doctor'
    },
    appointmentTime:{
        type:mongoose.Schema.ObjectId,
        ref:'Schedule'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})



const Appointment = mongoose.model('Appointment',appointmentSchema);


module.exports = Appointment;
