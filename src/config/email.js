require('dotenv').config()

const nodeemalier = require('nodemailer');

const transporter = nodeemalier.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendEmail(to, subject, text){
    try {
        let info = await transporter.sendMail({
            from: `"Event Management" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to}: ${info.response}`)
    }
    catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
}

module.exports = { sendEmail };
