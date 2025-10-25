const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const { dbConnect } = require("./db/connection");

const userRoute = require("./routes/userRoute");
// middleware
app.use(express.json());
app.use(cors());

// database connection
dbConnect();

// routes
app.use(userRoute);
// application
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`application is running on port: ${PORT}`);
});
