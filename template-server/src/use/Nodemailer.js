"use strict";
require("dotenv").config();
const nodemailer = require('nodemailer');
// Tạo một mã OTP ngẫu nhiên
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// const otp = generateOTP()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }

});

// async..await is not allowed in global scope, must use a wrapper
async function sendOTPEmail(email, firstName, lastName, otp) {
    if (otp) {
        // console.log(otp);
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Tumochua 👻"  <nguyenvantu14012003@gmail.com>', // sender address
            to: "ntu059778@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: `Xin Chào ${firstName} ${lastName} Mã xác thực của bạn là: ${otp}`, // plain text body
        });

        return info

    }

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}

sendOTPEmail().catch(console.error);


module.exports = {
    sendOTPEmail,
    generateOTP
}
