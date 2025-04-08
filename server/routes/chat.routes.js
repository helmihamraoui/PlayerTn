import express from 'express';
import {
  sendMessage,
  getMessages,
  getConversations,
  deleteMessage
} from '../controllers/chatController.js'; // Import the chat controller functions

const router = express.Router();

// Send a message
router.post('/messages/:senderId/:receiverId', sendMessage);

// Get all messages between two users
router.get('/messages/:senderId/:receiverId', getMessages);

// Get all conversations for a user
router.get('/conversations/:userId', getConversations);

// Delete a message
router.delete('/messages/:messageId', deleteMessage);

export default router;
