


const appError = require('./../utils/appError');

const handleTokenError = (error) => {


    return new appError('something went wrong please login again',401);

}
const globalError = ((error,request,response,next)=> {

    error.statusCode = error.statusCode || 501;
    error.status = error.status || 'error';

    if(process.env.NODE_ENVIRONMENT === 'development'){


        response
            .status(error.statusCode)
            .json({

                status:error.status,
                message:error.message,
                stack:error.stack
            })
    }

    else if(process.env.NODE_ENVIRONMENT === 'production'){

        if(error.isOperational){


            if(error.name === 'JsonWebTokenError'){
               error =  handleTokenError(error);
            }

            response
                .status(error.statusCode)
                .json({

                    status:error.status,
                    message:error.message,
                })
        }

        else{
            //send error in console
            console.error('ERROR');
            //send generic error
            response
                .status(500)
                .json({
                    status:'error',
                    message:'something went wrong'
                })
        }
    }



})


module.exports = globalError;