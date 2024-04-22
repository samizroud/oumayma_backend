require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
    attachments: options.attachments
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

