const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const { dbConnect } = require("./db/connection");

const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");

// middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// database connection
dbConnect();

// routes
app.use(userRoute);
app.use(roomRoute);

// application
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`application is running on port: ${PORT}`);
});
