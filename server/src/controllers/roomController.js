const mongoose = require("mongoose");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

const createRoom = async (req, res) => {
	try {
		const { roomNumber, roomType, pricePerNight, capacity, description } =
			req.body;

		const { adminId } = req.params;

		if (
			!roomNumber ||
			!roomType ||
			!pricePerNight ||
			!capacity ||
			!description
		) {
			res.status(204).send({ message: "please enter all fields" });
		}

		// check rooms if it already exists
		const existingRoomByRoomNumber = await Room.findOne({ roomNumber });

		if (existingRoomByRoomNumber) {
			res.status(409).send({ message: "room already exists" });
		}

		const adminUser = await User.findById(adminId);
		if (!adminUser) {
			return res.status(404).json({ message: "Admin not found" });
		}
		const newRoom = await Room.create({
			roomNumber,
			roomType,
			pricePerNight,
			capacity,
			description,
			createdBy: adminId,
		});

		res.status(200).send({ message: "room created successfully", newRoom });
	} catch (error) {
		console.error("room creation failed");
		res.status(500).send({ message: "failed to create a room" });
	}
};

module.exports = { createRoom };
