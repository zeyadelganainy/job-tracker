// Description: This is the entry point for the backend server. It sets up an Express server, connects to MongoDB, and defines a simple test route.

//Import necessary modules
const express = require('express'); // Express framework for building web applications
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const mongoose = require('mongoose'); // MongoDB connection
require('dotenv').config(); // Load environment variables from .env file

const app = express(); //Create an instance of Express
const PORT = process.env.PORT || 5000; // Set the port to listen on, defaulting to 5000 if not specified in .env

// Middleware
app.use(cors()); // Enable CORS for all routes 
app.use(express.json()); // Parse incoming JSON requests

// 🛡️ Routes
const authRoutes = require('./routes/auth');   // ⬅️ Import your auth routes
const appRoutes = require('./routes/applications'); // ⬅️ Import your application routes
app.use('/api/auth', authRoutes);              // ⬅️ Mount them under /api/auth
app.use('/api/applications', appRoutes);     // ⬅️ Mount them under /api/applications


// Simple test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Connect to MongoDB using Mongoose and handle connection events
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from the environment variables
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch(err => console.error('DB connection error:', err));
