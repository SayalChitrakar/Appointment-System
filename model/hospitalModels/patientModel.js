const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required:[true,'please enter your first name']

    },

    last_name:{
        type:String,
        required:[true,'please enter your last name']

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

    createDate:{
        type:Date,
        default:Date.now
    },

    createBy :{
        type:String,
        required:[true,'please enter your name']
    }
},{
    toJSON :{virtuals:true},
    toObject : {virtuals:true}
})



const Patient = mongoose.model('Patient',patientSchema);
module.exports = Patient;