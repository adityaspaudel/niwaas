"use client";

import { useParams } from "next/navigation";
import React from "react";

const GuestHome = () => {
	const { guestId } = useParams();
	return (
		<main>
			<div>Guest Home</div>
			<div>GuestId: {guestId}</div>
		</main>
	);
};

export default GuestHome;
