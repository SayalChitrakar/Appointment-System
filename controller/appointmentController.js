const catchAsyncError = require('./../utils/catchAsyncError');
const Appointment = require('./../model/hospitalModels/Appointment');
const Availability = require('./../model/hospitalModels/availabilityModel')

exports.getAllAppointments = catchAsyncError(async(request,response)=>{
    const appointments = await Appointment.find();

    response
        .status(200)
        .json({
            status:'success',
            data: appointments
        })
})

exports.getAppointment = catchAsyncError(async(request,response)=>{

    const appointment = await Appointment.findById(request.body);

    response
        .status(200)
        .json({
            status:'success',
            data: appointment
        })
})
exports.takeAppointment = catchAsyncError(async(request,response)=>{

    const doctor = request.body.doctor;
    const appointmentTime = request.body.appointmentTime;
    const isAvailable = await Availability.findOne({doctor:doctor,availableTime:appointmentTime});
    if(isAvailable){
        const appointment = await Appointment.create(request.body);

        response
            .status(200)
            .json({
                status:'success',
                data: appointment
            })

    }

    else{
        console.log('sorry doctor not available');
    }



})
exports.cancleAppointment = catchAsyncError(async(request,response)=>{

    const appointment = await Appointment.findByIdAndDelete(request.body);

    response
        .status(204)
        .json({
            status:'success',

        })
})
