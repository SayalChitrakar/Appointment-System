const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    NMC: {
        type: "Number",
        required:[true,'please enter your NPI number'],
        unique :[true,'the NPM number belongs to other doctor'],

    },
    name:{
        type:String,
        required:[true,'please enter your name']
    },

    phoneNumber:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'please enter your name'],
        validate:{
            validator: (email)=>{

                const emailString = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if(email.match(emailString)){
                    return true;
                }
                else{
                    return false;
                }
            },
            message:'Email is not valid'
        }
    },
    hospital:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Hospital'
        }
    ]
},{
    toJSON :{virtuals:true},
    toObject : {virtuals:true}
})

doctorSchema.virtual('specialist',{
    ref:'Specification',
    foreignField:'doctor',
    localField:'_id'
});

doctorSchema.virtual('available',{
    ref:'Availability',
    foreignField:'doctor',
    localField:'_id'
})

doctorSchema.pre(/^find/,  function(next){
    console.log('processing');
     this.populate({
         path: 'specialist',
         select: 'name -doctor -_id'
     } )
    next();
})

const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;