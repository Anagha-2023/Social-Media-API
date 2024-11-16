// src/utils/multerConfig.js

import multer from 'multer';

// Multer setup: restrict file types to jpg, jpeg, and png
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles'); // Define the folder for storing profile images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(file.mimetype);
  const basename = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());

  if (extname && basename) {
    return cb(null, true);
  } else {
    return cb(new Error('Only .jpg, .jpeg, .png files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
