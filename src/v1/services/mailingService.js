import nodemailer from 'nodemailer';
import { config } from 'dotenv';

// Load .env variables
config();

const SENDER_EMAIL = process.env.SENDER_EMAIL;

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;

const APP_PASSWORD = process.env.APP_PASSWORD;

const RECIEVER_EMAIL = process.env.RECIEVER_EMAIL;

async function sendMail(data) {
    const {
        name,
        companyName,
        companyEmail,
        preferredTime,
        notes
    } = data;

    const transporter = nodemailer.createTransport({
        host: SMTP_SERVER_HOST,
        port: 465,
        secure: true, // use SSL
        auth: {
            user: SENDER_EMAIL,
            pass: APP_PASSWORD
        }
    });

    const mailOption = {
        from: SENDER_EMAIL,
        to: RECIEVER_EMAIL,
        subject: "Meeting",
        text: `
            ${name}
            ${companyName}
            ${companyEmail}
            ${preferredTime}
            ${notes}
        `,
    }

    await transporter.sendMail(mailOption);
    console.log("email sent");

    return {
        message: "Email sent successfully, we will contact you ASAP"
    };
}

export default {
    sendMail
};