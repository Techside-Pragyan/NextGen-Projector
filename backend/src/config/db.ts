import mongoose from 'mongoose';

export const connectDB = async (): Promise<boolean> => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nextgen_project_generator';
  
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log('💚 MongoDB Connected successfully.');
    return true;
  } catch (error: any) {
    console.warn(`⚠️  MongoDB Connection failed: ${error.message}`);
    console.warn('⚡ Running backend with In-Memory / Local Storage Mock Database Fallback.');
    return false;
  }
};
