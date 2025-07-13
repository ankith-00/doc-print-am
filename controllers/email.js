const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD  
    }
});


function sendEmail(to, ownerName , store_ID){
    // console.log(process.env.GMAIL_USER)
    try{
        transporter.sendMail({
            to: to,
            subject: 'XB registration',
            html : `Hello ${ownerName},<br><br><h4>Your Store ID : ${store_ID}</h4>`
        })
        console.log('Email sent to :', to)
    }catch(error){
        console.log('Error while sending email : ', error)
    }
}


module.exports = sendEmail;