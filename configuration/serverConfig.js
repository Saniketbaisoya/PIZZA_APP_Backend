const dotenv = require('dotenv');

dotenv.config();


module.exports = {
    PORT : process.env.PORT,
    Cloud_Name : process.env.CLOUD_NAME,
    API_Key : process.env.API_KEY,
    API_Secret_Key : process.env.API_SECRET_KEY
}