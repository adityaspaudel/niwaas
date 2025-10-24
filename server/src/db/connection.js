const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
	try {
		const isConnected = await mongoose.connect(process.env.MONGODB_URL);
		if (!isConnected) {
			console.error("failed to connect mongodb");
		}
		console.log("connected to mongodb");
	} catch (error) {
		console.error("database connection failed", error);
	}
};

module.exports = { dbConnect };
