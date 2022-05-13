const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'Doctor'
    },
    availableTime:{
        type:mongoose.Schema.ObjectId,
        ref:'Schedule'
    }
})

availabilitySchema.pre(/^find/, function(next){

    this
        .populate({
            path:'doctor',
            select:'-__v'
        })
        .populate('availableTime')
    next();
})


const Availability = mongoose.model('Availability',availabilitySchema);
module.exports =  Availability;