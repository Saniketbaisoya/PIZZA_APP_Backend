const express = require('express');
const {loginUser} = require('../controllers/authController');

const authRouter = express.Router();

console.log("Request go to the loginUser controller....")
authRouter.post('/login',loginUser); // this is the authRouter registration....

module.exports = authRouter; // exporting the authRouter....