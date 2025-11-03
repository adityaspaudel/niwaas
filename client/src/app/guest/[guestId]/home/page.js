"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const GuestHome = () => {
  const { guestId } = useParams();

  const [allRoomsData, setAllRoomsData] = useState(null);
  const [guestData, setGuestData] = useState(null);

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
  const fetchGuestData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/user/${guestId}/getGuestData`
      );
      const data = await response.json();
      setGuestData(data);
    } catch (error) {
      console.error();
    }
  }, [guestId]);
  useEffect(() => {
    fetchAllRoomsData();
    fetchGuestData();
  }, [fetchAllRoomsData, fetchGuestData]);

  return (
    <main className="flex flex-col items-center content-center bg-gray-100 text-black ">
      <h2 className="font-bold text-2xl">Guest Home</h2>
      <div>GuestId: {guestId}</div>
      <div>{guestData && <pre>{JSON.stringify(guestData, 2, 2)}</pre>} </div>

      <div className="flex  content-center items-center">
        {allRoomsData && (
          <pre>
            <div className="flex gap-2 flex-wrap">
              {allRoomsData.roomsData.map((room) => (
                <div
                  key={room._id}
                  className="flex flex-col w-64 bg-pink-200 shadow-sm hover:shadow-md shadow-black rounded-sm"
                >
                  <Link href={`/guest/${guestId}/home/${room._id}`}>
                    <Image
                      src={`http://localhost:8000/uploads/${room.imagesUrl[0]}`}
                      height={200}
                      width={200}
                      alt="front"
                      className="object-cover h-40 transition 2s w-64 hover:scale-[104%] overflow-hidden"
                      unoptimized
                    />
                  </Link>
                  <div className="p-2">
                    <div>RoomNumber: {room?.roomNumber}</div>
                    <div>RoomTypes: {room?.roomType}</div>
                    <div>Price Per Night{room?.pricePerNight}</div>
                    <div>Capacity: {room?.capacity}</div>
                    <div>
                      Description:{" "}
                      <span className="wrap-break-all">
                        {room?.description}
                      </span>
                    </div>
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
