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
    <main>
      <div>RoomDetails</div>

      <div>
        {roomData && (
          <div>
            <div></div>
            <pre>{JSON.stringify(roomData, 2, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
};

export default memo(RoomDetails);
