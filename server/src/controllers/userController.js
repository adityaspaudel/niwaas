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
		res.status(201).send({ message: "registration successful" });
	} catch (error) {
		console.error("user registration failed", error);
		res
			.status(500)
			.send({ message: "user registration failed", error: error.message });
	}
};
const userLogin = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password) {
			res.status(204).send({ message: "please enter email and password" });
		}
		const existingUserByEmail = await User.findOne({ email });

		if (!existingUserByEmail) {
			res.status(404).send("user not found");
		} else {
			const matchPassword = await bcrypt.compare(
				password,
				existingUserByEmail.password
			);

			if (!matchPassword) {
				res.status(401).send({ message: "password didn`t match" });
			}

			const token = jwt.sign({ id: existingUserByEmail._id }, JWT_SECRET, {
				expiresIn: "7d",
			});
			res.status(200).json({
				message: "login successful",
				token,
				user: existingUserByEmail.email,
				role,
			});
		}
	} catch (error) {}
};
module.exports = { userRegistration, userLogin };
