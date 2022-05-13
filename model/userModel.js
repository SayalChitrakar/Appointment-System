const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'please enter your name'],
    },
    email:{
      type:String,
      required:[true, 'please enter your email'],
        unique :[true,'email is already taken'],
      validate:{
          //this only works for create and save
          validator : (email)=>{

              const emailString = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
              if(email.match(emailString)){
                  return true
              }
              else{
                  return false
              }
          },
          message:"please enter a valid email"
      }
    },
    userPhoto:String,
    password:{
        type:String,
        required:[true,'please enter your password'],
        select:false
    },
    phoneNumber:{
      type:String,
      required:[true,'please enter your phone number']
    },
    role:{
        type:String,
        default:'user',
        enum:['user','hospitalAdmin','superAdmin']
    },

    passwordChangedAt :{
        type:Date,
    }

})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password,12);
});


userSchema.methods.checkPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword);
}

userSchema.methods.checkTimestampPassword = function(timeStamp){

    if(this.passwordChangedAt){
        const convertedTime = this.passwordChangedAt.getTime();

        if(convertedTime>timeStamp){
            return true
        }

    }

    return false;

}

const User = mongoose.model('User',userSchema);

module.exports = User;