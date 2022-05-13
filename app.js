const express = require('express');
const AppError = require('./utils/appError');
const app = express();
const globalError = require('./controller/globalErrorController');
const hospitalRoutes = require('./routes/hospitalRoutes');
const hospitalAssetRoutes = require('./routes/assetRoutes');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoute')
const cors = require('cors');

app.use(express.json());
app.use(
    cors({
    origin:["http://localhost:3000"],
    credentials:true
    }
));

app.use('/api/v1/hospital',hospitalRoutes);
app.use('/api/v1/hospitalAsset',hospitalAssetRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/doctor',doctorRoutes);
app.use('api/v1/patient',patientRoutes);


app.all('*', (request,response,next)=>{

    next(new AppError(`Cannot find ${request.originalUrl} on this server`),404);
})


app.use(globalError);
module.exports = app;