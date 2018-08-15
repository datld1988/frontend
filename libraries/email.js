const nodemailer = require("nodemailer");
const Pinpoint = require("pinpoint-fw");
const { Config } = Pinpoint;

exports.sendMail = (to, subject, text) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: Config("app").MAIL_SERVICE,
      auth: Config("app").MAIL_ACCOUNT
    });

    transporter.sendMail({ to, subject, text }, function(error, info) {
      if (error) {
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
};
