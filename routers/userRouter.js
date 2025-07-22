const express = require("express");
const createUser = require("../controllers/userController");


// we have to initialise the router object to add the routes in a new file....
// Routers are used for segregating your routes/url's in different modules....
const userRouter = express.Router();
// http://localhost:6000/users/
userRouter.post('/create-user',createUser); // this is a route registration....

module.exports = userRouter;