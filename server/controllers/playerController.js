import Player from '../models/Player.js';
import User from '../models/User.js';

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
