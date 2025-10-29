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
    <main className="bg-gray-100 text-black text-sm">
      <div>Admin Home</div>
      {/* <div>adminId: {adminId}</div>]{" "} */}
      <div>
        <form className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Add a room
          </h2>

          <div className="flex flex-col">
            <label
              htmlFor="roomNumber"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Room Number
            </label>
            <input
              type="text"
              name="roomNumber"
              id="roomNumber"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="roomType"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Room Type
            </label>
            <input
              type="text"
              name="roomType"
              id="roomType"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="pricePerNight"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Price Per Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              id="pricePerNight"
              min="500"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="capacity"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select status</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="currentBooking"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Current Booking
            </label>
            <input
              type="text"
              name="currentBooking"
              id="currentBooking"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {roomData && (
        <div>
          <div>My Rooms</div>
          <div className="flex gap-2 flex-wrap ">
            {roomData.map((values, index) => (
              <div key={values._id}>
                <div className="max-w-md mx-auto bg-pink-200 shadow-md rounded-2xl p-6 border border-gray-100">
                  <div className="flex flex-col gap-2 text-sm text-gray-700">
                    <Link
                      href={`/admin/${adminId}/home/${values._id}/roomDetails`}
                    >
                      go to room
                    </Link>
                    <div>
                      <span className="font-medium text-gray-900">
                        Room Number:
                      </span>{" "}
                      {values?.roomNumber}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Room Type:
                      </span>{" "}
                      {values?.roomType}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Price Per Night:
                      </span>{" "}
                      Rs.{values?.pricePerNight}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Capacity:
                      </span>{" "}
                      {values?.capacity} Guests
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Description:
                      </span>{" "}
                      {values?.description}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Status:</span>{" "}
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          values?.status === "available"
                            ? "bg-green-100 text-red-700"
                            : "bg-red-100 text-green-700"
                        }`}
                      >
                        {values?.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Current Booking:
                      </span>{" "}
                      {values?.currentBooking || "—"}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Created At:
                      </span>{" "}
                      {new Date(values?.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        Updated At:
                      </span>{" "}
                      {new Date(
                        roomData?.singleRoomData?.updatedAt
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div>{JSON.stringify(roomData, 2, 2)}</div> */}
        </div>
      )}
    </main>
  );
};

export default AdminHome;
