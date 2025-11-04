"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Room = () => {
  const { guestId, roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [apiMessage, setApiMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch room data
  const fetchRoomData = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/room/${roomId}/getSingleRoomData`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch room data");

      setRoomData(data.singleRoomData);
      setApiMessage(data.message || "Room data fetched successfully");
    } catch (err) {
      console.error("Fetch error:", err.message);
      setApiMessage(err.message);
    } finally {
      const timer = setTimeout(() => setApiMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [roomId]);

  useEffect(() => {
    fetchRoomData();
  }, [fetchRoomData]);

  if (!roomData)
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-200 text-gray-600">
        Loading room details...
      </main>
    );

  return (
    <main className="bg-pink-200 min-h-screen w-full py-6">
      {apiMessage && (
        <div className="text-center text-sm text-blue-600 mb-4">
          {apiMessage}
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden">
        {/* ===== Room Images ===== */}
        <div className="flex flex-wrap gap-3 justify-center p-4">
          {roomData.imagesUrl.map((img, index) => (
            <div
              key={index}
              className="relative w-48 h-48 shrink-0 overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() =>
                setSelectedImage(`http://localhost:8000/uploads/${img}`)
              }
            >
              <Image
                src={`http://localhost:8000/uploads/${img}`}
                alt={roomData.roomType}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* ===== Room Info ===== */}
        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Room {roomData.roomNumber} — {roomData.roomType}
          </h2>

          <p className="text-gray-600 wrap-break-all">{roomData.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">
              Rs. {roomData.pricePerNight}/night
            </span>

            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                roomData.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {roomData.status}
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Capacity: {roomData.capacity} person
            {roomData.capacity > 1 && "s"}
          </div>
        </div>
      </div>

      {/* ===== Full Image Modal ===== */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Room Image"
              width={1000}
              height={800}
              className="object-contain w-full h-full rounded-lg"
              unoptimized
            />
            <button
              className="absolute top-2 right-2 bg-gray-200 text-black rounded-full px-3 py-1 font-semibold hover:bg-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Room;
