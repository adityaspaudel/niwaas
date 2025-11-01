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

    // Convert empty string to null
    const currentBookingValue = currentBooking ? currentBooking : null;

    // Handle new images (if uploaded)
    let imagesUrl = [];
    if (req.files && req.files.length > 0) {
      imagesUrl = req.files.map((file) => {
        const relativePath = file.path.split("uploads")[1].replace(/\\/g, "/");
        return relativePath.startsWith("/")
          ? relativePath.slice(1)
          : relativePath;
      });
    }

    // Find existing room
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // If no new images uploaded, keep existing images
    const finalImages = imagesUrl.length > 0 ? imagesUrl : room.imagesUrl;

    // Limit images
    if (finalImages.length > 5) {
      return res
        .status(400)
        .json({ message: "You can upload up to 5 images only" });
    }

    // Update room
    const updatedRoom = await Room.findOneAndUpdate(
      { roomNumber },
      {
        $set: {
          roomType,
          pricePerNight,
          capacity,
          description,
          status,
          imagesUrl: finalImages,
          currentBooking: currentBookingValue,
          updatedBy: adminId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error.message);
    return res.status(500).json({ message: "Failed to update room" });
  }
};

// 🔷 delete room
const deleteRoom = async (req, res) => {
  try {
    const { roomNumber } = req.body;

    console.log("roomNUmer", roomNumber);
    if (!roomNumber) {
      return res
        .status(400)
        .json({ message: "Please enter a roomNumber you want to delete" });
    }

    const deletedRoom = await Room.findOneAndDelete({ roomNumber });

    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ message: "Room deletion successful" });
  } catch (error) {
    console.error("Failed to delete room:", error);
    res
      .status(500)
      .json({ message: "Failed to delete room", error: error.message });
  }
};

// 🔷 get room
const getRoom = async (req, res) => {
  try {
    const { adminId } = req.params;

    const roomData = await Room.find({ createdBy: adminId });

    res.send({ message: "data sent successfully", roomData });
  } catch (error) {
    console.error(error);
  }
};
// 🔷 get single room data
const getSingleRoomData = async (req, res) => {
  try {
    const { roomId } = req.params;

    const singleRoomData = await Room.findById(roomId); 

    if (!singleRoomData) {
      return res.status(404).json({
        message:
          "Couldn't find room, room is either not created or deleted already",
      });
      
    }

    return res
      .status(200)
      .json({ message: "Room fetched successfully", singleRoomData });
  } catch (error) {
    console.error("Could not send room data:", error);
    return res.status(500).json({
      message: "Server error — couldn't send room data",
      error: error.message,
    });
  }
};
const getAllRooms = async (req, res) => {
  try {
    const roomsData = await Room.find();

    res
      .status(200)
      .json({ message: "fetched all rooms data successfully", roomsData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not fetch rooms data", error: error.message });
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getSingleRoomData,
  getAllRooms,
};
