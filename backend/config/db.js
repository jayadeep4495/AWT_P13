import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas cluster
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || mongoUri.includes('YOUR_USERNAME') || mongoUri.includes('YOUR_PASSWORD')) {
      console.warn('\n' + '='.repeat(70));
      console.warn('⚠️  MONGODB ATLAS CONFIGURATION NOTICE:');
      console.warn('The MONGODB_URI in backend/.env still contains placeholder credentials.');
      console.warn('Please update backend/.env with your real MongoDB Atlas connection string:');
      console.warn('mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mcq_generator');
      console.warn('Check README.md for step-by-step Atlas setup instructions.');
      console.warn('='.repeat(70) + '\n');
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000, // Timeout after 8s if cluster cannot be reached
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`📁 Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error('\n' + '!'.repeat(70));
    console.error('❌ MONGODB CONNECTION FAILED:');
    console.error(error.message);
    console.error('\nCommon fixes for beginners:');
    console.error('1. Check backend/.env: Did you replace YOUR_USERNAME and YOUR_PASSWORD?');
    console.error('2. Network Access in MongoDB Atlas: Did you click "Network Access" -> "Add IP Address" -> "Allow Access from Anywhere (0.0.0.0/0)"?');
    console.error('3. Database User: Ensure the user has "Read and write to any database" role in Atlas.');
    console.error('4. Special characters in password: If your password contains @, #, $, URL-encode them.');
    console.error('!'.repeat(70) + '\n');
  }
};

export default connectDB;
