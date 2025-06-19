const multer = require("multer"); // Middleware to handle image uploads
const path = require("path"); // Node.js path module to handle file paths

// Destination to store image
// uploads based on the route
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = ""; // Default folder

    if (req.baseUrl.includes("users")) {
      folder = "users"; // If the request is for user-related routes
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"; // If the request is for photo-related routes
    }
    cb(null, `uploads/${folder}/`); // Set the destination folder based on the route

  }, // Set the destination folder based on the route
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }, // Set the filename to the current timestamp with the original file extension
});

const imageUpload = multer({
  storage: imageStorage, // Use the defined storage configuration
  fileFilter: (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|png)$/)) {
      
      //upload only jpg, jpeg, png and gif format
      return cb(new Error("Por favor, evie apenas nos formatos jpg ou png!"))

    } // Check if the file is an image based on its extension
    
    cb(undefined, true); // If the file is valid, proceed with the upload

  }
});

module.exports = imageUpload;
