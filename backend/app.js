//7p0EOoNMoZ4SL8wS
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const mongoose = require('mongoose');


const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');
const teamRoutes = require('./routes/member');
const servicesRoutes = require('./routes/services');
const partnersRoutes = require('./routes/partners');
const galleryRoutes = require('./routes/gallery');
const eventsRoutes = require('./routes/events');
const aboutRoutes = require('./routes/about');
const archiveRoutes = require('./routes/archives');
 


const app = express();



mongoose.connect("mongodb+srv://smith:P0azDgKsVzVUUbY5@cluster0.ptmmu.mongodb.net/SESWebChallenge?retryWrites=true&w=majority", {useNewUrlParser: true,  useUnifiedTopology: true } )
.then( () =>{
  console.log("Connected to Database");
})
.catch(()=>{
  console.log('Connection failed');
});

//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//granting access to the images folder
app.use("/images", express.static(path.join("backend/images")));

//set headers to disablle CORS error that is triggered bb default
//CORS - Cross Origin Resource Error

app.use((req, res, next) => {

  //Allows domains to access resources
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");

  //Restrict to domains sending request with a set of particular headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/partners", partnersRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/archives", archiveRoutes);


module.exports = app;
