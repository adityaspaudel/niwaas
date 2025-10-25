const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	username: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "username is required"],
	},
	email: { type: String, unique: true, required: [true, "email is required"] },
	password: {
		type: String,
		required: [true, "password is required"],
		minLength: [6, "password must be at least 6 length long"],
	},
	role: {
		type: String,
		enum: {
			values: ["customer", "admin", "receptionist"],
			default: "customer",
			required: true,
		},
	},
	isActive: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
