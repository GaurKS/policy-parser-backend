const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();


// connecting to DB
mongoose
    .set('strictQuery', true)
    .connect(process.env.DATABASE, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log("DataBase Connected Successfully..."))
    .catch((err) => console.log(err));


// importing routes
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');


// using npm middlewares
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(bodyParser.json());


// using route middlewares
app.use('/api', adminRoutes);
app.use('/api', userRoutes);


// handling the ports
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API running on port ${port}`);
});