const catchAsyncError = require('./../utils/catchAsyncError');
const Schedule = require('../model/hospitalModels/scheduleModel');


exports.getAllSchedule = catchAsyncError(async(request,response)=>{

    const schedules = await Schedule.find();
    response
        .status(400)
        .json({
            status:'Success',
            data: schedules,
            message:"data successfully taken"
        })


})


exports.addSchedule = catchAsyncError(async(request,response)=>{

    const schedule = await Schedule.create(request.body);

    response
        .status(200)
        .json({
            status:'success',
            data: schedule
        })
})

exports.deleteSchedule = catchAsyncError(async(request,response)=>{

    await Schedule.findByIdAndDelete(request.params.id);

    response
        .status(204)
        .json({
            status:'success'
        })
})