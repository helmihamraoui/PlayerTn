import express from 'express';
import {
  addTerrain,
  deleteTerrain,
  setAvailability,
} from '../controllers/terainController.js';

const router = express.Router();

router.post('/terrain', addTerrain);
router.delete('/terrain/:terrainId', deleteTerrain);
router.put('/terrain/:terrainId/availability', setAvailability);

export default router;
