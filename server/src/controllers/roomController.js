const mongoose = require("mongoose");
const Room = require("../models/roomModel");
const User = require("../models/userModel");

const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerNight, capacity, description } =
      req.body;
    const { adminId } = req.params;

    // Basic validation
    if (
      !roomNumber ||
      !roomType ||
      !pricePerNight ||
      !capacity ||
      !description
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Ensure admin exists
    const adminUser = await User.findById(adminId);
    if (!adminUser) return res.status(404).json({ message: "Admin not found" });

    // Check if room already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom)
      return res.status(409).json({ message: "Room already exists" });

    // Handle images from multer: store relative paths
    const imagesUrl =
      req.files?.map((file) => {
        // Make path relative to 'uploads' folder
        const relativePath = file.path.split("uploads")[1].replace(/\\/g, "/");
        return relativePath.startsWith("/")
          ? relativePath.slice(1)
          : relativePath;
      }) || [];

    if (imagesUrl.length === 0)
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });

    if (imagesUrl.length > 5)
      return res
        .status(400)
        .json({ message: "You can upload up to 5 images only" });

    // Create new room
    const newRoom = await Room.create({
      roomNumber,
      roomType,
      pricePerNight,
      capacity,
      description,
      imagesUrl, // relative paths only
      createdBy: adminId,
    });

    res.status(201).json({
      message: "Room created successfully",
      room: newRoom,
    });
  } catch (error) {
    console.error("Room creation failed:", error);
    res
      .status(500)
      .json({ message: "Failed to create room", error: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      pricePerNight,
      capacity,
      description,
      status,
      currentBooking,
    } = req.body;

    const { adminId } = req.params;

    // Validate input
    if (!adminId || !roomNumber) {
      return res.status(400).json({
        message: "Please provide both adminId and roomNumber",
      });
    }

    // Check if admin exists
    const adminUser = await User.findById(adminId);
    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // ✅ Convert empty string to null
    const currentBookingValue = currentBooking ? currentBooking : null;

    // Update the room
    const updatedRoom = await Room.findOneAndUpdate(
      { roomNumber },
      {
        $set: {
          roomType,
          pricePerNight,
          capacity,
          description,
          status,
          currentBooking: currentBookingValue,
          updatedBy: adminId,
        },
      },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error.message);
    return res.status(500).json({ message: "Failed to update room" });
  }
};
const deleteRoom = async (req, res) => {
  try {
    const { roomNumber } = req.body;
    if (!roomNumber) {
      res
        .status(204)
        .send({ message: "please enter a roomNumber you want to delete" });
    }
    const deletedRoom = await Room.findOneAndDelete({ roomNumber });

    if (!deletedRoom) {
      res.status(400).send({ message: "error occurred while deleting a room" });
    }

    res.status(200).send({ message: "room deletion successful" });
  } catch (error) {
    console.error("failed to delete room", error);
    res.send({ message: "failed to delete a  room", error: error.message });
  }
};

const getRoom = async (req, res) => {
  try {
    const { adminId } = req.params;

    const roomData = await Room.find({ createdBy: adminId });

    res.send({ message: "data sent successfully", roomData });
  } catch (error) {
    console.error(error);
  }
};

const getSingleRoomData = async (req, res) => {
  try {
    const { roomId } = req.params;

    const singleRoomData = await Room.findOne({ _id: roomId });
    if (!singleRoomData) {
      res.send({ message: "couldn`t find Room" });
    }
    res
      .status(200)
      .send({ message: "room fetched successfully", singleRoomData });
  } catch (error) {
    console.error("could not send room data");
    res.json({ message: "serverError, couldn`t send room data" });
  }
};
module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getSingleRoomData,
};
