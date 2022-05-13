const mongoose = require('mongoose');

const assetsSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'a asset must have a name']
    },
    quantity:{
        type:String,
        required:[true,'please enter a quantity of an assets']
    },
    updatedAt : {
        type:Date,
        default:Date.now
    },
    hospitalId :{
        type:mongoose.Schema.ObjectId,
        ref:'Hospital',
        required:[true,'assets must belong to the hospital']
    },

},{
    toJSON :{virtuals:true},
    toObject : {virtuals:true}
})

const Asset = mongoose.model('Asset',assetsSchema);

module.exports = Asset;