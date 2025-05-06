const express = require('express');
const Tracking = require('../models/tracking');
const router = express.Router();

// Get all tracking records
router.get('/', async (req, res) => {
  try {
    const tracking = await Tracking.find();
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific tracking by ID
router.get('/:id', async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    res.json(tracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new tracking
router.post('/', async (req, res) => {
  try {
    const tracking = new Tracking(req.body);
    const newTracking = await tracking.save();
    res.status(201).json(newTracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tracking by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTracking = await Tracking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTracking) {
      return res.status(404).json({ message: "Tracking not found" });
    }

    res.status(200).json(updatedTracking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete tracking by ID
router.delete('/:id', async (req, res) => {
  try {
    const tracking = await Tracking.findByIdAndDelete(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    res.json({ message: 'Tracking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;