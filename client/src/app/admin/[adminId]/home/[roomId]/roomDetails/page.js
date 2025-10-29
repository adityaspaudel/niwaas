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
        <div>RoomDetails</div>
        <div>
          {roomData && (
            <div>
              <div>
                <div>Room Number: {roomData?.singleRoomData?.roomNumber}</div>
                <div>Room Type: {roomData?.singleRoomData?.roomType}</div>{" "}
                <div>
                  Price Per Night: {roomData?.singleRoomData?.pricePerNight}
                </div>{" "}
                <div>Capacity: {roomData?.singleRoomData?.capacity}</div>{" "}
                <div>Description: {roomData?.singleRoomData?.description}</div>{" "}
                <div>Status: {roomData?.singleRoomData?.status}</div>{" "}
                <div>{roomData?.singleRoomData?.currentBooking}</div>{" "}
                <div>
                  Created By:{" "}
                  {new Date(
                    roomData?.singleRoomData?.createdAt
                  ).toLocaleString()}
                </div>{" "}
                <div>Created By: {roomData?.singleRoomData?.createdBy}</div>{" "}
                <div>
                  Updated At:{" "}
                  {new Date(
                    roomData?.singleRoomData?.updatedAt
                  ).toLocaleString()}
                </div>
              </div>
              {/* <pre>{JSON.stringify(roomData, 2, 2)}</pre> */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(RoomDetails);
