"use client";

import { useParams } from "next/navigation";
import React from "react";

const CustomerHome = () => {
	const { customerId } = useParams();
	return (
		<main>
			<div>CustomerHome</div>
			<div>customerId: {customerId}</div>
		</main>
	);
};

export default CustomerHome;
