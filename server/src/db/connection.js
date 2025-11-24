const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
// const MONGODB_ATLAS_URI="mongodb+srv://adityaspaudel_db_user:LEC54C55C3UuyQay@cluster0.wt2hkw2.mongodb.net/?appName=Cluster0";
const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGODB_ATLAS_URI);
    if (!isConnected) {
      console.error("failed to connect mongodb");
    }
    console.log(`connected to mongodb ${process.env.MONGODB_ATLAS_URI}`);
  } catch (error) {
    console.error("database connection failed", error);
  }
};

module.exports = { dbConnect };
