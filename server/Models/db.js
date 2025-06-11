const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://jaiganesh1637:dbPassword@cluster1.iyabo2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
