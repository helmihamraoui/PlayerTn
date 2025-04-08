import Owner from '../models/owner.model.js';
import Terrain from '../models/terrain.model.js';

// Add Owner (by admin)
export const addOwner = async (req, res) => {
  try {
    
    const newOwner = new Owner(req.body);
    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Owner's terrains
export const getTerrainsByOwner = async (req, res) => {
  try {
    const terrains = await Terrain.find({ ownerId: req.params.ownerId });
    res.json(terrains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Owner
export const updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.ownerId, req.body, { new: true });
    res.json(updatedOwner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
