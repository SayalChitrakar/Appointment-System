const User = require('./../model/userModel');
const appError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsyncError');
const jwt = require('jsonwebtoken');


const getJwtToken  = (user)=>{
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
exports.signUp = catchAsyncError(
    async(request,response,next)=>{
        const user = await User.create({
            name:request.body.name,
            email:request.body.email,
            password:request.body.password,
            phoneNumber:request.body.phoneNumber,
            userPhoto:request.body.userPhoto,

        })
        const token = getJwtToken(user);
        response
            .status(201)
            .json({
                status:'success',
                data:{
                    user,
                    token
                }
            })
    }
)

exports.login = catchAsyncError(

    async(request,response,next)=>{

        const email = request.body.email;
        const password = request.body.password;

        const user = await User.findOne({email}).select('+password');
        console.log(user);
       if(!email  || !password){

          return next(new appError('please provide email and password',401));
       }
       else if(!user){
            return next(new appError('user does not exist',401));
       }
       else if(user){
           if(!await user.checkPassword(password,user.password)){
               return next(new appError('incorrect password'));
           }
        }

       const token =  getJwtToken(user);
       response.cookie('jwt',token,{
           expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN),
           secure:false,
           httpOnly:true
       })

       response
           .status(200)
           .json({
               status:'Success',
               data:{
                   token,
               }
           })
    }
)


exports.protectData = catchAsyncError(
    async (request,response,next)=>{

        console.log('protecting data');
    let token;

        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){

            token = request.headers.authorization.split(' ')[1];
            //console.log(token);
        }

        if(!token){
            return next(new appError('please login first',401))
        }

        //verifying the token

        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded);
        // if User does not exist
        const user = await User.findById(decoded.id);

        if(!user){

            return next(new appError('User not found',401));
        }


        //Check if user has recently changed password

      if(await user.checkTimestampPassword(decoded.iat)) {

          return next( new appError('You recently changed password please login again',401));
      }

      //Grants access
        request.user = user;

        next();

    }

)
exports.checkRole = (roles)=>{

    return((request,response,next)=>{
       // console.log('this is user' + request.user.role)

        if(!roles.includes(request.user.role)){

            return next(new appError('you do not have permission to do this',401))
        }
        //some restrictions
        //1) user cannot change his/ her own role unless it's an admin
           /*  if(request.user.role === 'user'){

            if(request.body.role){
                return next( new appError('you do not have permission to change the role',401));
            }
            }*/
        next();
    })
}

