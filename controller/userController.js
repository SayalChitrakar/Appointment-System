const User = require('./../model/userModel');
const catchAsyncError = require('./../utils/catchAsyncError');
const jwt = require('jsonwebtoken');
const appError = require('./../utils/appError')
exports.getAllUser = catchAsyncError(
    async(request,response,next)=>{

        const user = await User.find();
        response
            .status(200)
            .json({
                status:'success',
                data:{
                    user
                }
            })
    }
)

exports.getUser = catchAsyncError(
    async(request,response,next)=>{

        const user = await User.findById(request.params.id);
        response
            .status(200)
            .json({
                status:'success',
                data:{
                    user
                }
            })

    }
)

exports.deleteUser = catchAsyncError(
    async(request,response,next)=>{
        const userId =request.params.id;

        await User.findByIdAndDelete(userId);

        response
            .status(200)
            .json({
                status:'success'
            })

    }
)

exports.updateUser = catchAsyncError(
    async (request,response,next)=>{

        if(request.user.role === 'user'){
            if(request.body.role){
               return(next(new appError('you do not have permission to change role',401)))
            }
        }

        const user = await User.findByIdAndUpdate(request.params.id, request.body,
        {
                new:true,
                runValidators:true
            })


        response
            .status(200)
            .json({
                status:'success',
                data:{
                    user
                }
            })



    }
)