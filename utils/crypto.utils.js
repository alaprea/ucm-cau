const bcrypt = require("bcrypt");

async function hashPassword(password, saltRounds = 10, callback) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    callback(null, await bcrypt.hash(password, salt));
  } catch (err) {
    callback(new Error(err));
  }
}

async function validarPassword(password, hash, callback) {
  try {
    callback(null, await bcrypt.compare(password, hash));
  } catch (err) {
    callback(new Error(err));
  }
}

module.exports = {
  hashPassword,
  validarPassword,
}