const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const cors = require("cors");
const { dbConnect } = require("./db/connection");

// middleware
app.use(express.json());
app.use(cors());

// database connection
dbConnect();

// application
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`application is running on port: ${PORT}`);
});
