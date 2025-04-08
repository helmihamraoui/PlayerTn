import express from 'express';
import {
  addOwner,
  getTerrainsByOwner,
  updateOwner,
} from '../controllers/ownerController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin check middleware
const checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Apply middleware and define routes
router.post('/owner', authenticateToken, checkAdmin, addOwner); // Admin adds owner
router.get('/owner/:ownerId/terrains', authenticateToken, getTerrainsByOwner); // Get all terrains of an owner
router.put('/owner/:ownerId', authenticateToken, updateOwner); // Update owner profile

export default router;