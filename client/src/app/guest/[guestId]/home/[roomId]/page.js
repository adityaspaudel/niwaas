"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Room = () => {
  const { guestId, roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  console.log("guestId", guestId);
  console.log("roomId", roomId);
  const [apiMessage, setApiMessage] = useState(null);
  const fetchRoomData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${roomId}/getSingleRoomData`
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setRoomData(data);
      setApiMessage(data.message);
    } catch (error) {
      console.error(error);
      setApiMessage(error);
    } finally {
      setTimeout(() => {
        setApiMessage("");
      }, [5000]);
    }
  }, [roomId]);
  useEffect(() => {
    fetchRoomData();
  }, [fetchRoomData]);
  return (
    <main>
      <h1>Room</h1>
      {apiMessage}
      {roomData && (
        <div>
          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Room Image */}
            <Image
              src={`http://localhost:8000/uploads/${roomData?.singleRoomData.imagesUrl[0]}`}
              alt={roomData?.singleRoomData?.roomType}
              className="h-48 w-full object-cover"
              height={400}
              width={400}
              unoptimized
            />
            {/* Room Info */}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Room {roomData?.singleRoomData?.roomNumber} —{" "}
                {roomData?.singleRoomData?.roomType}
              </h2>

              <p className="text-gray-600 wrap-break-words">
                {roomData?.singleRoomData?.description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-blue-600">
                  Rs. {roomData?.singleRoomData?.pricePerNight}/night
                </span>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    roomData?.singleRoomData?.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {roomData?.singleRoomData?.status}
                </span>
              </div>

              <div className="text-sm text-gray-500">
                Capacity: {roomData?.singleRoomData?.capacity} person
                {roomData.singleRoomData?.capacity > 1 && "s"}
              </div>
            </div>
          </div>
          {/* <pre>{JSON.stringify(roomData, 2, 2)}</pre> */}
        </div>
      )}
    </main>
  );
};

export default Room;
