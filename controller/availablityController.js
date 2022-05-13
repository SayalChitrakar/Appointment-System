const catchAsyncError = require('./../utils/catchAsyncError');
const Availability= require('../model/hospitalModels/availabilityModel');

exports.setAvailability = catchAsyncError(async(request,response)=>{

    const availability = await Availability.create(request.body);

    response
        .status(200)
        .json({
            status:'success',
            data:availability

        })
})

exports.getAllAvailibility = catchAsyncError(async(request,response)=>{

    const availabilities = await Availability.find();

    response
        .status(200)
        .json({
            status:'success',
            data:availabilities
        })
})

exports.deleteAvailability = catchAsyncError(async(request,response)=>{
    console.log(response.body);
    await Availability.findOneAndDelete(response.body);
    response
        .status(204)
        .json({
            status:'success',
        })
})