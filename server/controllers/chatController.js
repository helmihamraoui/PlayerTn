import Message from '../models/message.model.js'; // Import the Message model

// Get messages between two users
export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender_id: senderId, receiver_id: receiverId },
        { sender_id: receiverId, receiver_id: senderId },
      ],
    }).sort({ createdAt: 1 }); // Sort messages by creation time
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId } = req.params;
  const { message } = req.body;
  try {
    const newMessage = new Message({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
};
// get converstions
export const getConversations = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await Message.find({
      $or: [{ sender_id: userId }, { receiver_id: userId }],
    })
      .sort({ createdAt: -1 })
      .populate('sender_id', 'username')
      .populate('receiver_id', 'username');
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch conversations', error });
  }
};
// Delete a message by ID (optional)
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error });
  }
};