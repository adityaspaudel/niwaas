"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { memo, useCallback, useEffect, useState } from "react";

const RoomDetails = () => {
  const { adminId, roomId } = useParams();
  const [roomData, setRoomData] = useState(null);

  const getSingleRoom = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${roomId}/getSingleRoomData`
      );
      if (!response.ok) throw new Error("Response is not ok");
      const data = await response.json();
      setRoomData(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to get single room data", error);
    }
  }, [roomId]);

  useEffect(() => {
    getSingleRoom();
  }, [getSingleRoom]);

  const room = roomData?.singleRoomData;

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-900 px-4 py-10">
      {room && (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-8 border border-gray-200">
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
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          )}

          {/* Room Info */}
          <div className="space-y-3 text-sm md:text-base">
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
        </div>
      )}
    </main>
  );
};

export default memo(RoomDetails);
