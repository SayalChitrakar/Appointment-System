const catchAsyncError = require('./../utils/catchAsyncError');
const Doctor = require('./../model/hospitalModels/doctorsModel');


exports.getAllDoctors = catchAsyncError(async(request,response)=>{

    const doctors = await Doctor.find();
    response
        .status(400)
        .json({
            status:'Success',
            data: doctors,
            message:"data successfully taken"
        })


})
exports.getDoctor = catchAsyncError(async(request,response)=>{

    const specification = await Doctor.findById(request.params.id);

    response
        .status(200)
        .json({
            status:'success',
            data: specification
        })
})

exports.addDoctor = catchAsyncError(async(request,response)=>{

    const doctor = await Doctor.create(request.body);

    response
        .status(200)
        .json({
            status:'success',
            data: doctor
        })
})

exports.deleteDoctor = catchAsyncError(async(request,response)=>{

    await Doctor.findByIdAndDelete(request.params.id);

    response
        .status(204)
        .json({
            status:'success'
        })
})