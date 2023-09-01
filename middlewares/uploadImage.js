const multer = require('multer');

//MULTER
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/userImages');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({storage: fileStorageEngine})

module.exports = upload;