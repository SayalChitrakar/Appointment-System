const catchAsyncError = require('./../utils/catchAsyncError');
const Patient = require('./../model/hospitalModels/patientModel');


exports.getAllPatients = catchAsyncError(async(request,response)=>{

    const patients = await Patient.find();
    response
        .status(400)
        .json({
            status:'Success',
            data: patients,
            message:"data successfully taken"
        })


})
exports.getPatient = catchAsyncError(async(request,response)=>{

    const patient = await Patient.findById(request.params.id);

    response
        .status(200)
        .json({
            status:'success',
            data: patient
        })
})

exports.addPatient = catchAsyncError(async(request,response)=>{

    const patient = await Patient.create(request.body);

    response
        .status(200)
        .json({
            status:'success',
            data: patient
        })
})

exports.deletePatient = catchAsyncError(async(request,response)=>{

    await Patient.findByIdAndDelete(request.params.id);

    response
        .status(204)
        .json({
            status:'success'
        })
})