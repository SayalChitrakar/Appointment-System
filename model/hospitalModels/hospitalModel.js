const mongoose  = require('mongoose');
const Asset = require('./assetsModel');
const hospitalSchema = new mongoose.Schema ({

    name: {
        type:String,
        required :[true, 'A hospital must have a name'],
        trim:true
    },
    ratingsAverage:{
        type:Number,
        min:[1, 'a rating must be at least 1'],
        max:[5 , 'a rating must not exceed 5'],
        set:(value)=>Math.round(value*10)/10

    },
    location:{
       //GeoJSON
        type:{
            type:String,
            default: 'Point',
            enum:['Point']
        },
        coordinates:[Number], // longitude ,latitude
        address:String,

    },

    description:{
        type:String,
        required :[true,'a tour must have its description'],
        trim:true,
    },
    hospitalImage:{
        type:String,
    },
    hospitalLogo:{
        type:String,
    },
    hospitalDoctor:{
        type:mongoose.Schema.ObjectId,
        ref:'doctor',
        unique:[true,'doctor has already been registered']
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

//this is virtual populate
hospitalSchema.virtual('assets',
    {
        ref:'Asset',
        foreignField:'hospitalId',
        localField:'_id'
    })


hospitalSchema.virtual('doctors',{
    ref:'Doctor',
    foreignField:'hospital',
    localField:'_id'
})

hospitalSchema.pre(/^findOneAndDelete/,async function(next){


    const hospital =  await this.findOne();
    await Asset.findOneAndDelete({hospitalId:hospital._id});
    next();
});

hospitalSchema.pre(/^find/,function(next){
    console.log('loading');
    this.populate('doctors');
    next();
})




hospitalSchema.index({location:'2dsphere'})

const Hospital  = mongoose.model ('Hospital',hospitalSchema);




module.exports = Hospital;