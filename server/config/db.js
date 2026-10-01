const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let isMongoConnected = false;

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura_agency';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Quick timeout to avoid hanging if offline
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at "${uri}".`);
    console.warn(`[MongoDB] Falling back to file-backed JSON store in server/data/ so the application runs seamlessly out-of-the-box.`);
    console.warn(`[MongoDB] Set MONGODB_URI in server/.env (e.g., MongoDB Atlas URI) to switch to Cloud MongoDB anytime.`);
  }
};

const getDBStatus = () => ({
  connected: isMongoConnected,
  type: isMongoConnected ? 'MongoDB (Active)' : 'File-Backed Local Store (Graceful Fallback)',
  uri: process.env.MONGODB_URI ? '[Configured via MONGODB_URI]' : 'mongodb://127.0.0.1:27017/aura_agency'
});

module.exports = { connectDB, getDBStatus, isMongoConnected: () => isMongoConnected };
