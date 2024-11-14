import mongoose, { connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}
let isConnected = false;
async function dbConnect() {
    if (connection.isConnected) {
        console.log("Already connected to database........");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI || '', {});

        isConnected = db.connections[0].readyState === 1; // 1 means connected
        console.log("Database Connected Successfully.........");
    }
    catch (error) {
        console.log("Database connectoin failed: ", error);

        process.exit(1);
    }
}

export default dbConnect;


