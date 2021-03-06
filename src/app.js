//This is the root file of the project which is where we will set up our web server with Express

const express = require('express');
require('./db/mongoose'); 
//Requiring mongoose file in db folder does not require a variable in the case as we won't be directly calling it
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
//Loading in the router for users

const app = express();

//Defining our own middleware for Express with the use method. Takes in a function with 3 arguments (request,
//response and next). Similar idea to Mongoose's middleware where you have to call next if you want to function
//to continue on to the next stage (which can be a subsequent middleware or the response)
//NOTE: Middleware must be defined before our routers! This way the middleware will be executed everytime a 
//route defined after is called.
//NOTE: Middleware can be defined in a separate file in a 'middleware' folder and we going to define our 
//authentication middleware in the other file
// app.use((req, res, next) => {
//     res.status(503).send('Sever under maintenance! Please wait while we try to get it up again!');
// });  //For shutting down the sever by blocking all the routes

app.use(express.json()); 
//This line makes Express automatically parse any incoming JSON from the client-side into an object
app.use(userRouter);
app.use(taskRouter);
//Remember to make the app use the routers (mini-apps) for user and task

module.exports = app;

//NOTE: The reason why we separate out all of the app components from the app.listen function and export the app
//components from app.js to index.js to be combined with app.listen function is because SuperTest does not require
//the app.listen function in order to run the application. Hence, SuperTest will run app.js when testing our app 
//while our normal npm run dev command to run the app's dev environment will continue to run index.js