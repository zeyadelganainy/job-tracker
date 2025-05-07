const express = require('express');
const Application = require('../models/Application');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * GET /api/applications
 * Get all applications for the logged-in user
 */
router.get('/', authMiddleware, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.userId });
    res.status(200).json(apps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

/**
 * POST /api/applications
 * Create a new application
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { company, position, status, appliedDate, notes } = req.body;

    const newApp = new Application({
      userId: req.user.userId,   // from decoded token
      company,
      position,
      status,
      appliedDate,
      notes
    });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create application' });
  }
});

/**
 * PUT /api/applications/:id
 * Update an application (only if it belongs to the logged-in user)
 */
router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const appId = req.params.id;
      const userId = req.user.userId;
  
      const updatedApp = await Application.findOneAndUpdate(
        { _id: appId, userId },   // Make sure this application belongs to the logged-in user
        req.body,                 // Fields to update
        { new: true }             // Return the updated document
      );
  
      if (!updatedApp) {
        return res.status(404).json({ message: 'Application not found or access denied' });
      }
  
      res.status(200).json(updatedApp);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update application' });
    }
  });
  
/**
 * DELETE /api/applications/:id
 * Delete an application (only if it belongs to the logged-in user)
 */
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const appId = req.params.id;
      const userId = req.user.userId;
  
      const deletedApp = await Application.findOneAndDelete({
        _id: appId,
        userId
      });
  
      if (!deletedApp) {
        return res.status(404).json({ message: 'Application not found or access denied' });
      }
  
      res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete application' });
    }
  });
    

module.exports = router;
