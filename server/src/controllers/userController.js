const express = require("express");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const userRegistration = async (req, res) => {
	try {
		const { fullName, username, email, password, role } = req.body;

		if (!fullName || !username || !email || !password || !role) {
			res.json({ message: "please fill the all fields" });
		}

		const existingUserByUsername = await User.findOne({ username });
		const existingUserByEmail = await User.findOne({ email });

		if (existingUserByUsername || existingUserByEmail) {
			res
				.status(409)
				.send("user already exists please try another username or password");
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		await User.create({
			fullName,
			username,
			email,
			password: hashedPassword,
			role,
		});
		res.status(201).send("registration successful");
	} catch (error) {
		console.error("user registration failed", error);
		res
			.status(500)
			.send({ message: "user registration failed", error: error.message });
	}
};

module.exports = { userRegistration };
