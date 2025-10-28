"use client";

import Link from "next/link";
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
      console.log("data ", data?.roomData);
      setRoomData(data?.roomData);
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
      <div>adminId: {adminId}</div>]{" "}
      <pre>
        {roomData && (
          <div>
            <div>
              {roomData.map((values, index) => (
                <div key={values._id}>
                  <Link
                    href={`/admin/${adminId}/home/${values._id}/roomDetails`}
                  >
                    go to room
                  </Link>
                  <div>roomNumber: {values?.roomNumber}</div>
                  <div>roomType: {values?.roomType}</div>
                  <div>pricePerNight: {values?.pricePerNight}</div>
                  <div>capacity:{values?.capacity}</div>
                  <div>description:{values?.description}</div>
                  <div>status:{values?.status}</div>
                  <div>roomNumber:{values?.roomNumber}</div>
                  <div>status:{values?.status}</div>
                  <div>currentBooking:{values?.currentBooking}</div>
                  <div>createdBy:{values?.createdBy}</div>
                  <div>createdAt:{values?.createdAt}</div>
                  <div>updatedAt:{values?.updatedAt}</div>
                </div>
              ))}
            </div>
            <div>{JSON.stringify(roomData, 2, 2)}</div>
          </div>
        )}
      </pre>
    </main>
  );
};

export default AdminHome;
