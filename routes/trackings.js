const express = require('express');
const Tracking = require('../models/tracking');
const router = express.Router();

// Get all tracking
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
  const tracking = new Tracking(req.body);
  try {
    const newTracking = await tracking.save();
    res.status(201).json(newTracking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update tracking by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tracking = await Tracking.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!tracking) return res.status(404).send("Util not found");

    res.status(200).send(tracking);
  } catch (error) {
    for (i in error.errors) res.status(500).send(error.errors[i].message);
  }
});

// Delete tracking by ID
router.delete('/:id', async (req, res) => {
  try {
    const tracking = await Tracking.findById(req.params.id);
    if (!tracking) {
      return res.status(404).json({ message: 'Tracking not found' });
    }
    await tracking.remove();
    res.json({ message: 'Tracking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
