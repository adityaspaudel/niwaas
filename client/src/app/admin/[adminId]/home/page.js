"use client";

import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const AdminHome = () => {
  const { adminId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/room/${adminId}/getRoom`
      );

      const data = await response.json();
      console.log("data ", data);
      setRoomData(data);
    } catch (error) {
      console.error("failed to room data");
    } finally {
    }
  }, [adminId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <main>
      <div>Admin Home</div>
      <div>adminId: {adminId}</div>

      <div>{roomData && <div>{JSON.stringify(roomData)}</div>}</div>
    </main>
  );
};

export default AdminHome;
