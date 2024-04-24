const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, path.join(__dirname, "../images"));
    } else {
      cb(null, path.join(__dirname, "../uploads"));
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});


const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image' && file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.fieldname === 'rapport' && file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Fichier non pris en charge.'), false);
  }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.uploadPicture = upload.single('image'); 
exports.uploadMultiplePicture = upload.array('images', 5); 
exports.uploadRapport = upload.single('rapport'); 
