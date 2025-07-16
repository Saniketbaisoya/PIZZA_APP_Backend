const dotenv = require('dotenv');

dotenv.config();


module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    Secret_Key : process.env.Secret_key,
    JWT_EXPIRY : process.env.JWT_Expiration,
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET_KEY
}