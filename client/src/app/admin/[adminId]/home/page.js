"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const AdminHome = () => {
  const { adminId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    capacity: "",
    status: "",
    currentBooking: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${adminId}/getRoom`
      );
      const data = await response.json();
      setRoomData(data?.roomData);
    } catch (error) {
      console.error("failed to fetch room data");
    }
  }, [adminId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setNewRoomData({ ...newRoomData, [e.target.name]: e.target.value });
  };

  //  Minimal fix: handle multiple image files properly
  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(newRoomData).forEach((key) => {
        formData.append(key, newRoomData[key]);
      });
      images.forEach((file) => formData.append("images", file));

      const res = await fetch(
        `http://localhost:8000/room/${adminId}/createRoom`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Failed to upload room");
      const data = await res.json();
      console.log("Room added:", data);
      alert("room added successfully");
      fetchData(); // Refresh room list
    } catch (error) {
      // console.error("Error uploading room:", error);
      setErrorMessage(error);
      alert(error);
    } finally {
      setTimeout(() => {
        setErrorMessage(null);
      }, [5000]);
    }
  };

  return (
    <main className="bg-gray-100 text-black text-sm">
      {/* <div>Admin Home</div> */}

      {/* Add Room Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Add a room
          </h2>

          {/* Inputs */}
          <div className="flex flex-col">
            <label
              htmlFor="roomNumber"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              id="roomNumber"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="roomType"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Room Type
            </label>
            <select
              name="roomType"
              id="roomType"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="">Select Room Type</option>
              <option value="Single">Single</option>
              <option value="Family">Family</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pricePerNight"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price Per Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              id="pricePerNight"
              min="500"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="capacity"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="currentBooking"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current Booking
            </label>
            <input
              type="text"
              name="currentBooking"
              id="currentBooking"
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ✅ File Upload */}
          <div className="flex flex-col">
            <label
              htmlFor="images"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* My Rooms ----------------------------------*/}
      {roomData && (
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Rooms
          </h2>
          <div className="flex flex-wrap gap-6">
            {roomData.map((room) => (
              <div
                key={room._id}
                className="w-full sm:w-[300px] p-2 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-transform transform hover:-translate-y-1 bg-pink-200"
              >
                <div className="relative w-full h-48">
                  {room.imagesUrl && room.imagesUrl.length > 0 ? (
                    <Image
                      src={`http://localhost:8000/uploads/${room.imagesUrl[0]}`}
                      alt={`Room ${room.roomNumber}`}
                      fill
                      className="object-cover rounded-md"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col gap-2 text-sm text-gray-700">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Room {room.roomNumber}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        room.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>

                  <div>Type: {room.roomType}</div>
                  <div>Price: Rs.{room.pricePerNight}</div>
                  <div>Capacity: {room.capacity} Guests</div>
                  <div className="truncate">
                    Description: {room.description}
                  </div>
                  <div>Current Booking: {room.currentBooking || "—"}</div>

                  <Link
                    href={`/admin/${adminId}/home/${room._id}/roomDetails`}
                    className="mt-3 inline-block bg-pink-500 hover:bg-pink-600 text-white text-center text-sm py-2 rounded-md font-medium transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminHome;
