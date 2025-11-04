"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";

const RoomDetails = () => {
  const { adminId, roomId } = useParams();

  const [roomData, setRoomData] = useState(null);
  const [editProduct, setEditProduct] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [roomEditValue, setRoomEditValue] = useState({
    roomNumber: "",
    roomType: "",
    capacity: "",
    pricePerNight: "",
    description: "",
    status: "",
    currentBooking: "",
  });
  const [editImages, setEditImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  // Fetch Single Room Data
  const getSingleRoom = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${roomId}/getSingleRoomData`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setRoomData(data);

      // Prefill edit form
      const room = data?.singleRoomData;
      if (room) {
        setRoomEditValue({
          roomNumber: room.roomNumber || "",
          roomType: room.roomType || "",
          capacity: room.capacity || "",
          pricePerNight: room.pricePerNight || "",
          description: room.description || "",
          status: room.status || "",
          currentBooking: room.currentBooking || "",
        });
      }
    } catch (error) {
      console.error("Failed to get single room data", error);
      setErrorMessage("Failed to fetch room data.");
    } finally {
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }, [roomId]);

  useEffect(() => {
    getSingleRoom();
  }, [getSingleRoom]);

  const room = roomData?.singleRoomData;

  // Handle input changes
  const handleRoomEditChange = (e) => {
    const { name, value } = e.target;
    setRoomEditValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setEditImages(files);
  };

  // Handle Update Room
  const handleRoomUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append text fields
      Object.keys(roomEditValue).forEach((key) => {
        formData.append(key, roomEditValue[key]);
      });

      // Append images (if any)
      if (editImages.length > 0) {
        editImages.forEach((file) => formData.append("images", file));
      }

      const res = await fetch(
        `http://localhost:8000/room/${adminId}/updateRoom`,
        {
          method: "PUT",
          // headers: { "Content-Type": "multipart/form-data" },

          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Room updated successfully!");
        setEditProduct(false);
        setEditImages([]);
        getSingleRoom(); // refresh UI
      } else {
        alert(data.message || "Failed to update room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Error updating room");
    }
  };

  // Delete Room
  const deleteRoom = async (e, roomNumber) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/room/${adminId}/deleteRoom`,
        {
          method: "DELETE",
          body: JSON.stringify({ roomNumber }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert(`Room deleted successfully`);
    } catch (error) {
      console.error(`Could not delete room ${roomNumber}`, error);
    } finally {
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };
  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen  text-gray-900 px-4 py-2 bg-pink-200">
      {errorMessage && <div>{errorMessage}</div>}
      <div className="flex flex-col items-end content-end w-full">
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer  text-white  hover:bg-red-700 px-4 py-1 rounded-2xl"
        >
          logout
        </button>
      </div>

      <div className="bg-pink-200 px-8 rounded-xl">
        {room && (
          <div className="w-full max-w-2xl bg-gray-200 shadow-lg  p-6 md:p-8 border border-gray-200 rounded-xl">
            {/* Header */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center border-b pb-3">
              Room Details
            </h2>
            {/* Room Images */}
            {room.imagesUrl && room.imagesUrl.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-5">
                {room.imagesUrl.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow"
                  >
                    <Image
                      src={`http://localhost:8000/uploads/${img}`}
                      alt={`Room ${room.roomNumber}`}
                      fill
                      className="object-cover transition-transform duration-300 cursor-pointer hover:scale-105"
                      unoptimized
                      onClick={() => openImage(img)}
                    />
                  </div>
                ))}
              </div>
            )}
            {selectedImage && (
              <div
                onClick={closeImage}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              >
                <div className="relative w-[90vw] h-[80vh]">
                  <Image
                    src={`http://localhost:8000/uploads/${selectedImage}`}
                    alt="Full Image"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                  <button
                    onClick={closeImage}
                    className="absolute top-3 right-3 text-white text-2xl font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
            {/* Room Info */}
            <div className="space-y-3 text-sm md:text-base min-w-96">
              <div className="flex justify-between">
                <span className="font-medium">Room Number:</span>
                <span>{room.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Room Type:</span>
                <span>{room.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price per Night:</span>
                <span>Rs. {room.pricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Capacity:</span>
                <span>{room.capacity} Guests</span>
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="mt-1 text-gray-700 bg-gray-50 rounded-md p-2">
                  {room.description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    room.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {room.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Current Booking:</span>
                <span>{room.currentBooking || "—"}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm pt-2 border-t mt-4">
                <span>Created:</span>
                <span>{new Date(room.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Updated:</span>
                <span>{new Date(room.updatedAt).toLocaleString()}</span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-2 text-white mt-4">
              <button
                onClick={() => setEditProduct(!editProduct)}
                className="bg-gray-600 cursor-pointer hover:bg-gray-700 px-2 text-xs rounded-sm"
              >
                {editProduct ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={(e) => deleteRoom(e, room.roomNumber)}
                className="bg-red-400 cursor-pointer hover:bg-red-500 px-2 rounded-sm text-xs"
              >
                Delete {room?.roomNumber}
              </button>
            </div>
            {/* 🔷 Edit Room Form */}
            <div className="">
              {editProduct && (
                <form
                  onSubmit={handleRoomUpdate}
                  className="space-y-3 mt-4 text-sm md:text-base bg-yellow-100 p-2 rounded-md"
                >
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Room Number:</label>
                    <input
                      name="roomNumber"
                      type="text"
                      value={roomEditValue.roomNumber}
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                      onChange={handleRoomEditChange}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Room Type:</label>
                    <select
                      name="roomType"
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                      value={roomEditValue.roomType}
                      onChange={handleRoomEditChange}
                    >
                      <option value="">Select option</option>
                      <option value="Single">Single</option>
                      <option value="Family">Family</option>
                    </select>
                  </div>
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">
                      Price per Night (Rs.):
                    </label>
                    <input
                      name="pricePerNight"
                      type="number"
                      min="0"
                      value={roomEditValue.pricePerNight}
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                      onChange={handleRoomEditChange}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <label className="font-medium">Capacity:</label>
                    <input
                      name="capacity"
                      type="number"
                      value={roomEditValue.capacity}
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                      onChange={handleRoomEditChange}
                    />
                  </div>
                  <div className="flex flex-col text-sm">
                    <label className="font-medium">Description:</label>
                    <textarea
                      name="description"
                      value={roomEditValue.description}
                      onChange={handleRoomEditChange}
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col text-sm">
                    <label className="font-medium">Room Images:</label>
                    <input
                      name="images"
                      type="file"
                      multiple
                      onChange={handleRoomImagesChange}
                      className="bg-white border-gray-400 border hover:border-black px-2 rounded-sm"
                    />
                  </div>
                  {/* Preview Selected Images */}
                  {editImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 text-sm">
                      {editImages.map((file, idx) => (
                        <Image
                          key={idx}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="bg-white  hover:border px-2 rounded-sm"
                          height={200}
                          width={200}
                        />
                      ))}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default memo(RoomDetails);
