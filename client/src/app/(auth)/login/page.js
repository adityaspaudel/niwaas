"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(6, "Too Short")
		.max(20, "Too Long")
		.required("required"),
});

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [apiMessage, setApiMessage] = useState(null);
	const router = useRouter();
	return (
		<div className="flex flex-col justify-center items-center">
			<h1>Login</h1>

			<Formik
				initialValues={formData}
				validationSchema={loginSchema}
				onSubmit={async (values) => {
					await sleep(500);
					alert(JSON.stringify(values, null, 2));
					try {
						const response = await fetch(
							`http://localhost:8000/user/userLogin`,
							{
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(values),
							}
						);
						const data = await response.json();
						setFormData(values);

						console.log(data);
						setApiMessage(data.message);

						if (!response.ok) throw new Error("could not login");
						if (data.role == "admin") router.push(`/admin/${data.id}/home`);
						else if (data.role == "customer")
							router.push(`/customer/${data.id}/ home`);
						else if (data.role == "receptionist")
							router.push(`/receptionist/${data.id}/home`);
					} catch (error) {
						console.error("login failed", error);
						setApiMessage(error.message);
					} finally {
						setTimeout(() => {
							setApiMessage(null);
						}, [5000]);
					}
				}}
			>
				{({ isSubmitting }) => (
					<Form className="flex flex-col">
						<label htmlFor="email">Email</label>
						<Field name="email" placeholder="jane@acme.com" type="email" />
						<label htmlFor="password">Password</label>
						<Field
							name="password"
							placeholder="jane@acme.com"
							type="password"
						/>

						<button type="submit" disabled={isSubmitting}>
							Submit
						</button>
					</Form>
				)}
			</Formik>
			{apiMessage && (
				<div>
					{apiMessage == "login successful" ? (
						<div className="text-green-400">{apiMessage}</div>
					) : (
						<div className="text-red-400"></div>
					)}
				</div>
			)}
		</div>
	);
};
export default LoginForm;
