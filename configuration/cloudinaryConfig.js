const { Cloud_Name, API_Key, API_Secret_Key } = require('./serverConfig');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: Cloud_Name,
    api_key: API_Key,
    api_secret: API_Secret_Key
})

