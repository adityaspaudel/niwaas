"use client";

import { useParams } from "next/navigation";
import React from "react";

const AdminHome = () => {
	const { adminId } = useParams();
	return (
		<main>
			<div>Admin Home</div>
			<div>adminId: {adminId}</div>
		</main>
	);
};

export default AdminHome;
