require('dotenv').config();

const nodemailer = require("nodemailer");

async function sendMailToUser(mailType){
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_FROM_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            }
        });

        let details = await transporter.sendMail(mailType) ;
        console.log("Message sent: %s", details.messageId);

    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = sendMailToUser;