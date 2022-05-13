const mongoose = require('mongoose');


const specificationSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Specification's name is required"],
        unique:[true,'specification already exists']
    },

    doctor:{
        type:mongoose.Schema.ObjectId,
        ref:'Doctor',
    }
});





const Specification = mongoose.model('Specification',specificationSchema);
module.exports = Specification;