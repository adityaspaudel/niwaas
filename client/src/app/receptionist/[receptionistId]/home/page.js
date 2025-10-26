"use client";

import { useParams } from "next/navigation";
import React from "react";

const ReceptionistHome = () => {
	const { receptionistId } = useParams();
	return (
		<main>
			<div>ReceptionistHome</div>
			<div>receptionistId: {receptionistId}</div>
		</main>
	);
};

export default ReceptionistHome;
