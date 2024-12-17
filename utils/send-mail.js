import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

 export async function sendEmail(to, subject, text) {
    try {
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER, // Sender address
        to, // Receiver address
        subject, // Subject
        text, // Plain text body
      });
  
      return true
    } catch (error) {
      throw error;
    }
  }