import Terrain from '../models/terrain.model.js';

// Add new terrain by owner
export const addTerrain = async (req, res) => {
  try {
    const newTerrain = new Terrain({
      ...req.body,
      availability: true, // default availability
    });
    const savedTerrain = await newTerrain.save();
    res.status(201).json(savedTerrain);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a terrain
export const deleteTerrain = async (req, res) => {
  try {
    await Terrain.findByIdAndDelete(req.params.terrainId);
    res.json({ message: 'Terrain deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Set availability
export const setAvailability = async (req, res) => {
  try {
    const terrain = await Terrain.findByIdAndUpdate(
      req.params.terrainId,
      { availability: req.body.availability },
      { new: true }
    );
    res.json(terrain);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
