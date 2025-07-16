const { cloud_name, api_key, api_secret } = require('./serverConfig');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret

});


module.exports = cloudinary;