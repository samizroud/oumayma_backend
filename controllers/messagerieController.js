const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Message = require('../models/messagerieModel');
const io = require("socket.io")();

// Envoyer un nouveau message
exports.sendMessage = catchAsync(async (req, res, next) => {
  const { sender, recipient, content } = req.body;

  const message = await Message.create({ sender, recipient, content });

  // Émettre un événement Socket.IO pour le nouveau message
  io.emit("newMessage", message);

  res.status(201).json({
    status: 'success',
    message,
  });
});

// Récupérer les messages d'un utilisateur spécifique
exports.getMessagesByUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const messages = await Message.find({ $or: [{ sender: userId }, { recipient: userId }] });

  res.status(200).json({
    status: 'success',
    messages,
  });
});

// Supprimer un message
exports.deleteMessage = catchAsync(async (req, res, next) => {
  const { messageId } = req.params;

  const message = await Message.findByIdAndDelete(messageId);

  if (!message) {
    return next(new AppError('Message not found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

module.exports = io;
