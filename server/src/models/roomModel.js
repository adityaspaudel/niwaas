// server/src/models/roomModel.js

import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
	{
		roomNumber: {
			type: String,
			required: [true, "Room number is required"],
			unique: true,
			trim: true,
		},

		roomType: {
			type: String,
			required: [true, "Room type is required"],
			enum: ["Single", "Family"],
		},

		pricePerNight: {
			type: Number,
			required: [true, "Room price is required"],
			min: [0, "Price must be positive"],
		},

		capacity: {
			type: Number,
			required: [true, "Room capacity is required"],
			min: [1, "At least one guest must be allowed"],
		},

		description: {
			type: String,
			required: [true, "Room description is required"],
			trim: true,
		},

		imagesUrl: [
			{
				type: String,
				required: true,
			},
		],

		status: {
			type: String,
			enum: ["Available", "Occupied"],
			default: "Available",
		},

		currentBooking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},

		// Audit fields
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
