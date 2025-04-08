import express from 'express';
import {
    addPlayerInfo,
  getPlayerProfile,
  updatePlayerProfile,
  viewOtherPlayer
} from '../controllers/playerController.js';

const router = express.Router();

// Add player information route (after registration)
router.post('/addPlayerInfo/:userId', addPlayerInfo);
// Get the profile of the logged-in player
router.get('/player/profile/:userId', getPlayerProfile);

// Update the player's profile
router.put('/player/profile/:userId', updatePlayerProfile);

// View another player's public profile
router.get('/player/view/:id', viewOtherPlayer);

export default router;
