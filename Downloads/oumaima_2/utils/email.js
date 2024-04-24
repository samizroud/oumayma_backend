require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const { text } = require('express');
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: "oumaimayari9@gmail.com",
      pass: "arkb tsug qvqi ayrk"
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject:Option.subject,
    text: Option.message,
    
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw new Error("Erreur lors de l'envoi de l'e-mail.");
  }
};

module.exports = sendEmail;

