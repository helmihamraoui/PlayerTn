import Player from '../models/player.model.js';
import User from '../models/user.model.js';

// 🔍 Get current player's profile
export const getPlayerProfile = async (req, res) => {
  try {
    const player = await Player.findOne({ userId: req.params.userId }).populate('userId', '-password');
    if (!player) return res.status(404).json({ message: 'Player not found' });

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get player profile', error: err });
  }
};

// ✏️ Update profile
export const updatePlayerProfile = async (req, res) => {
  try {
    const player = await Player.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true });
    if (!player) return res.status(404).json({ message: 'Player not found' });

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update player profile', error: err });
  }
};

// 🔍 View another player’s profile by ID
export const viewOtherPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('userId', '-password');
    if (!player) return res.status(404).json({ message: 'Player not found' });

    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching player', error: err });
  }
};

/// Add player info after registration
export const addPlayerInfo = async (req, res) => {
    const { userId } = req.params;  // Get userId from route params
    const { phoneNumber, address, dateOfBirth, profilePicture, bio, rating } = req.body;
  
    // Clean up the userId by trimming any extra whitespace or newline characters
    const cleanedUserId = userId.trim();
  
    try {
      // Find the user by userId
      const user = await User.findById(cleanedUserId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has already added player information
      const existingPlayer = await Player.findOne({ userId: cleanedUserId });
      if (existingPlayer) {
        return res.status(400).json({ message: 'Player information already added' });
      }
  
      // Create and save new player information
      const newPlayer = new Player({
        userId: cleanedUserId,
        phoneNumber,
        address,
        dateOfBirth,
        profilePicture,
        bio,
        rating,
      });
  
      await newPlayer.save();
  
      // Update the user's role to 'player'
      user.role = 'player';
      await user.save();
  
      res.status(201).json({ message: 'Player information added successfully', player: newPlayer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add player information', error });
    }
  };