"use client";

import { useParams } from "next/navigation";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const RoomDetails = () => {
  const { adminId, roomId } = useParams();

  const [roomData, setRoomData] = useState(null);
  console.log("adminId", adminId);
  console.log("roomId", roomId);

  const getSingleRoom = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${roomId}/getSingleRoomData`
      );
      if (!response.ok) throw new Error("response is not ok");

      const data = await response.json();
      setRoomData(data);
      console.log(data);
    } catch (error) {
      console.error("failed to get singleRoom Data", error);
    } finally {
    }
  }, [roomId]);
  useEffect(() => {
    getSingleRoom();
  }, [getSingleRoom]);

  return (
    <main className="flex content-center items-center bg-gray-100 text-black min-h-screen w-screen">
      <div className="flex flex-col content-center items-center">
        <div>
          {roomData && (
            <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-100">
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Room Details
                </h2>{" "}
                <div>
                  <span className="font-medium text-gray-900">
                    Room Number:
                  </span>{" "}
                  {roomData?.singleRoomData?.roomNumber}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Room Type:</span>{" "}
                  {roomData?.singleRoomData?.roomType}
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Price Per Night:
                  </span>{" "}
                  Rs.{roomData?.singleRoomData?.pricePerNight}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Capacity:</span>{" "}
                  {roomData?.singleRoomData?.capacity} Guests
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Description:
                  </span>{" "}
                  {roomData?.singleRoomData?.description}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Status:</span>{" "}
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      roomData?.singleRoomData?.status === "available"
                        ? "bg-green-100 text-red-700"
                        : "bg-red-100 text-green-700"
                    }`}
                  >
                    {roomData?.singleRoomData?.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Current Booking:
                  </span>{" "}
                  {roomData?.singleRoomData?.currentBooking || "—"}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Created At:</span>{" "}
                  {new Date(
                    roomData?.singleRoomData?.createdAt
                  ).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Updated At:</span>{" "}
                  {new Date(
                    roomData?.singleRoomData?.updatedAt
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(RoomDetails);
