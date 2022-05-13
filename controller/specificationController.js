const catchAsyncError = require('./../utils/catchAsyncError');
const Specification = require('./../model/hospitalModels/doctorSpecificationModel');

exports.getAllSpecifications = catchAsyncError(async(request,response)=>{


    const specifications = await Specification.find().populate('doctor','name');

    response
        .status(400)
        .json({
            status:'success',
            data:specifications
        })
})

exports.getSpecification = catchAsyncError(async(request,response)=>{

    const specification = await Specification.findById(request.params.id).populate('doctor','name');

    response
        .status(200)
        .json({
            status:'success',
            data: specification
        })
})

exports.addSpecification = catchAsyncError(async(request,response)=>{

    const specification = await Specification.create(request.body);

    response
        .status(200)
        .json({
            message:'success',
            data:specification
        })
})

exports.deleteSpedification = catchAsyncError(async(request,response)=>{

    await Specification.findByIdAndDelete(request.params.id);

    response
        .status(204)
        .json({
            status:'success'
        })
})
