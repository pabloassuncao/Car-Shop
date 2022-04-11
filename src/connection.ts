import mongoose from 'mongoose';

const MONGO_DB_URI = 'mongodb://localhost:27017/CarShop';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/CarShop';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URL
    || MONGO_DB_URI,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;
