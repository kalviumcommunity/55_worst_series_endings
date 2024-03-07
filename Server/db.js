require('dotenv').config();

const URI = process.env.URI;
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(URI)
    console.log('📦 connected to mongoDB');
  } catch (err) {
    console.error('❌ error connecting to mongoDB:', err.message);
  }
};

const disconnectFromDB = async () => {
  try {
    mongoose.disconnect()
    console.log('📦 disconnected from mongoDB');
  } catch (err) {
    console.error('❌ error disconnecting from mongoDB:', err.message);
  }
};

const isConnected = () => {
    return mongoose.connection.readyState === 1;
  }

module.exports = {
  connectToDB,
  disconnectFromDB,
  isConnected
};
