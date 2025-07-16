const multer = require('multer'); // multer ko require krke hmme ek multer function mila...
const path = require('path');
// Now abb multer(function) ko call krke hmme ek middleware milega jo uploader 
// variable mai store hoga and then usko use krke as a middleware apni api mai file ko upload krege
// multer function apne andr destination mai ek folder lega jisme voh sari images store hoti jayegi jo uploader middleware se upload hogi

// proper way mai store nhi kr pa rhe the images ko....
// const uploader = multer({
//  des : 'upload/'
//})
const storage = multer.diskStorage({
    destination : (req,file,next)=>{
        next(null,'upload/')
    },
    filename: (req,file,next) =>{
        console.log(file);
        next(null,`${Date.now()}${path.extname(file.originalname)}`);
    }
});
const uploader = multer({storage : storage});
module.exports = uploader;

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs'); // To create the 'upload' directory if it doesn't exist

// const uploadDir = 'upload/'; // Define your upload directory

// // Create the upload directory if it doesn't exist
// if (!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true creates parent directories if they don't exist
// }

// const storageConfiguration = multer.diskStorage({
//     destination: (req, file, cb) => { // Use cb for consistency
//         cb(null, uploadDir); // Destination for uploaded files
//     },
//     filename: (req, file, cb) => { // Use cb for consistency
//         console.log("File being processed by Multer:", file);
//         // Generate a unique filename: timestamp + original extension
//         cb(null, `${Date.now()}-${file.originalname}`);
//         // If you only want the extension use: `${Date.now()}${path.extname(file.originalname)}`
//     }
// });

// const uploader = multer({ storage: storageConfiguration });

// module.exports = uploader; // Export the multer instance