const sharp = require('sharp');
const path = require('path');
const fs = require("fs");

const guardarImagen = async (file, namefile,callback) => {
  if (file) {
    let root = path.join(__dirname, '..');
    await sharp(root + '\\public\\img\\userImages\\' + file.originalname).resize(32,32).jpeg().toFile(root + '/public/img/userImages/avatar/' + namefile + '_icon.jpg');
    await sharp(root + '\\public\\img\\userImages\\' + file.originalname).resize(250,250).jpeg().toFile(root + '/public/img/userImages/profile/' + namefile + '_normal.jpg');
    fs.unlink(root + '\\public\\img\\userImages\\' + file.originalname, (err) => {
      callback(new Error('No se pudo borrar la imagen original'));
    });
  }
}

const borrarImagen = async (file,callback) => {
  if(file) {
    let root = path.join(__dirname, '..');
    fs.unlink(root + '\\public\\img\\userImages\\' + file.originalname, (err) => {
      callback(new Error('No se pudo borrar la imagen original'));
    });
  }
}

module.exports = {
  guardarImagen,
  borrarImagen
}