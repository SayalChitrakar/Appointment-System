
const catchAsyncError = require('./../utils/catchAsyncError');
const hospitalModel = require('./../model/hospitalModels/hospitalModel');
const appError = require('./../utils/appError');
class ApiFeature {

    constructor(query,queryString){

        this.query = query;
        this.queryString = queryString;
    }

    filter(){

        this.query = this.query.find(this.queryString)

        return this;

    }
    sort(){

        if(this.queryString.sort){

            this.query = this.query.sort(this.queryString.sort)
        }

        return this;

    }
}

exports.getAllHospitals = catchAsyncError(

    async(request,response,next)=>{

        const features = new ApiFeature(hospitalModel.find(),request.query);
        features.filter();

        //const hospitals = await hospitalModel.find(request.query).populate('assets');
        const hospitals = await features.query;
        response
            .status(200)
            .json({
                status:'success',
                data:{
                    hospitals
                }
            })


    }
)

exports.getHospital = catchAsyncError(


    async(request,response,next)=>{


        const hospitalId = request.params.id;
        const hospital = await hospitalModel.findById(hospitalId).populate('assets');
        response
            .status(200)
            .json({
                status:'success',
                data:{
                    hospital
                }
            })
    }

);
exports.deleteHospital = catchAsyncError(

    async(request,response,next)=>{


        const hospitalId = request.params.id;
        await hospitalModel.findByIdAndDelete(hospitalId);
        response
            .status(200)
            .json({
                status:'success'
            })


    });

exports.addHospital = catchAsyncError(
    async(request,response,next)=>{


        const hospital = await hospitalModel.create(request.body);

        response
            .status(201)
            .json({
                status:'success',
                data:{
                    hospital
                }
            })

    }
);

exports.updateHospital = catchAsyncError(

    async(request,response,next)=>{
        const hospital = await hospitalModel.findByIdAndUpdate(request.params.id,request.body,{

            new:true,
            runValidators:true
        });
        response
            .status(200)
            .json({
                status:'success',
                data:{
                    hospital
                }
            })
    }
);


exports.getHospitalsNearMe = catchAsyncError(
    async(request,response,next)=>{

        const {distance,userLocation,unit} = request.params;
        console.log(distance)
        const [lat,lng] = userLocation.split(',');
        const radius = unit === 'mi'? distance/3963.2: distance/6378.1;

        if(!lat || !lng){ 
             return next(new appError('please allow the app to track your location',400));
        }
      //  console.log(request.params);
        const hospitals = await hospitalModel.find({
            location:{
                $geoWithin:{
                    $centerSphere:[[lng,lat],radius]
                }
            }
        });
        response
            .status(200)
            .json({
                status:'success',
                results:hospitals.length,
                data:{
                    hospitals
                }
            })
    }
)
exports.getDistanceOfHospital = catchAsyncError(

    async(request,response,next)=>{
        const  {location,unit} = request.params;
        const [lat,lng] =  location.split(',');
        if(!lat || !lng){
            return next(new appError('please allow the app to track your location',400));
        }

        const distance = await hospitalModel.aggregate([
            {
                $geoNear:{
                    near:{
                        type:'Point',
                        coordinates:[lng *1,lat *1]
                    },
                    distanceField:'distance',
                    distanceMultiplier:multiplier
                },

            },
            {
                $project:{
                    distance:1,
                    name:1
                }
            }


        ])

        response
            .status(200)
            .json({
                status:'success',
                data:{
                    distance
                }
            })


    }
)
