"use client";

import { useParams } from "next/navigation";
import React from "react";

const StaffHome = () => {
	const { staffId } = useParams();
	return (
		<main>
			<div>StaffHome</div>
			<div>Staff: {staffId}</div>
		</main>
	);
};

export default StaffHome;
