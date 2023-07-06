const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true, // tells Mongoose to use the MongoDB driver's createIndex() function instead of the deprecated ensureIndex() function for index creation
    });
    console.log('MongoDB successed to connect');
  } catch (error) {
    console.log(error.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
