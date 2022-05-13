
const catchAsyncError = require('./../utils/catchAsyncError');
const Asset = require('./../model/hospitalModels/assetsModel');

exports.getAllAssets = catchAsyncError(async(request,response,next)=>{

    const assets = await Asset.find();

    response
        .status(200)
        .json({
            status:'success',
            data:{
                assets
            }
        })

})

exports.getAsset = catchAsyncError((request,response,next)=>{

    const asset = Asset.findById(request.params.id);

    response
        .status(200)
        .json({
            status:'success',
            data:{
                asset
            }
        })
});

exports.addAssets = catchAsyncError(async(request,response,next)=>{

    const asset = await Asset.create(request.body);

    response
        .status(201)
        .json({
            status:'success',
            data:{
                asset
            }
        })

});

exports.deleteAsset = catchAsyncError(async(request,response,next)=>{

    await Asset.findByIdAndDelete(request.params.id);

    response
        .status(200)
        .json({
            status:'success'
        })
})