import express from 'express';
import {
  addOwner,
  getTerrainsByOwner,
  updateOwner,
} from '../controllers/ownerController.js'; // Import the owner controller functions

const router = express.Router();

router.post('/owner', addOwner); // Admin adds owner
router.get('/owner/:ownerId/terrains', getTerrainsByOwner); // Get all terrains of an owner
router.put('/owner/:ownerId', updateOwner); // Update owner profile

export default router;
