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

		amenities: [
			{
				type: String,
				enum: [
					"Non Air Conditioning without lunch and dinner",
					"Air Conditioning without lunch and dinner",
					"Non Air Conditioning with lunch and dinner",
					"Air Conditioning with lunch and dinner",
				],
			},
		],

		images: [
			{
				type: String,
				required: true,
			},
		],

		status: {
			type: String,
			enum: ["Available", "Occupied", "Cleaning", "Maintenance"],
			default: "Available",
		},

		isBooked: {
			type: Boolean,
			default: false,
		},

		currentBooking: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},

		discount: {
			type: Number,
			default: 0,
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
