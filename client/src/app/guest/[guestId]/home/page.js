"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const GuestHome = () => {
  const { guestId } = useParams();

  const [allRoomsData, setAllRoomsData] = useState(null);

  const fetchAllRoomsData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/room/getAllRooms`);

      if (!response.ok) throw new Error(error.message);

      const data = await response.json();
      setAllRoomsData(data);
    } catch (error) {
      console.error(error.message);
    } finally {
    }
  }, []);
  useEffect(() => {
    fetchAllRoomsData();
  }, [fetchAllRoomsData]);
  return (
    <main className="text-black">
      <div>Guest Home</div>
      <div>GuestId: {guestId}</div>

      <div>
        {allRoomsData && (
          <pre>
            <div className="flex gap-2 flex-wrap">
              {allRoomsData.roomsData.map((room) => (
                <div key={room._id} className="flex flex-col w-64 bg-pink-200">
                  <Image
                    src={`http://localhost:8000/uploads/${room.imagesUrl[0]}`}
                    height={200}
                    width={200}
                    alt="front"
                    className="object-cover h-40 w-64"
                    unoptimized
                  />
                  <div className="p-2">
                    <div>RoomNumber: {room?.roomNumber}</div>
                    <div>RoomTypes: {room?.roomType}</div>
                    <div>Price Per Night{room?.pricePerNight}</div>
                    <div>Capacity: {room?.capacity}</div>
                    <div>Description: {room?.description}</div>
                    <div>Images Url: {room?.roomNumber}</div>
                    <div>Status: {room?.status}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div>{JSON.stringify(allRoomsData, 2, 2)}</div> */}
          </pre>
        )}
      </div>
    </main>
  );
};

export default GuestHome;
