const md5 = require("md5");

exports.deleteProperty = (object, properties) => {
  for (let i = 0; i < properties.length; i++) {
    if (object[properties[i]]) {
      delete object[properties[i]];
    }
  }
  return object;
};

exports.keepProperty = (object, properties) => {
  let result = {};
  for (let i = 0; i < properties.length; i++) {
    if (object[properties[i]]) {
      result[properties[i]] = object[properties[i]];
    }
  }
  return result;
};
exports.encryptPassword = (salt, password) =>
  md5(password.trim() + salt.trim());

exports.randomString = len => {
  let text = "";
  let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return text.trim();
};
