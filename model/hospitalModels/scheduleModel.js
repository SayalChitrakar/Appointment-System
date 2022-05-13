const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({

    shiftName:{
        type:String,
        required:[true,'mention shift name'],
        unique:[true,'shift name already exist']
    },
    startTime:{
        type:String,
        required:[true,'start time must be mentioned']
    },
    endTime:{
        type:String,
        required:[true,'end time must be mentioned']
    },

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'Doctor'
    }


});

scheduleSchema.pre(/^find/,function(next){

    this.populate('doctor');
    next();
})

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;