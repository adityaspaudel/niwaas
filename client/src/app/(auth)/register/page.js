"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const signupSchema = Yup.object().shape({
	fullName: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	username: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	email: Yup.string().email("Invalid email").required("Required"),
	password: Yup.string()
		.min(6, "Too Short")
		.max(20, "Too Long")
		.required("required"),
});

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		role: "",
	});
	const [apiMessage, setApiMessage] = useState(null);
	return (
		<div className="flex flex-col content-center items-center h-screen w-screen bg-white text-black">
			<h1>Sign Up</h1>
			<Formik
				initialValues={formData}
				validationSchema={signupSchema}
				onSubmit={async (values) => {
					await sleep(500);
					alert(JSON.stringify(values, null, 2));

					try {
						const response = await fetch(
							`http://localhost:8000/user/userRegistration`,
							{
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: JSON.stringify(values),
							}
						);

						const data = await response.json();
						// console.log(data);
						const msg = await data.message;
						if (!response.ok) throw new Error("failed to post formData");
						console.log(msg);
						// alert(`form submitted`);
						setFormData({
							fullName: "",
							username: "",
							email: "",
							password: "",
							role: "",
						});

						setApiMessage(msg);
					} catch (error) {
						console.error("could not submit registration form data", error);
						setApiMessage(error.message);
					} finally {

					}
				}}
			>
				{({ isSubmitting, touched, errors }) => (
					<Form className="flex flex-col content-center items-center h-screen w-screen bg-white text-black">
						<label htmlFor="fullName">First Name</label>
						<Field name="fullName" placeholder="Jane" />
						<div className="text-red-400 text-xs">
							{touched.fullName && errors.fullName ? (
								<div>{errors.fullName}</div>
							) : null}
						</div>
						<label htmlFor="username">Last Name</label>
						<Field name="username" placeholder="Doe" />
						<div className="text-red-400 text-xs">
							{touched.username && errors.username ? (
								<div>{errors.username}</div>
							) : null}
						</div>
						<label htmlFor="email">Email</label>
						<Field name="email" placeholder="jane@acme.com" type="email" />
						<div className="text-red-400 text-xs">
							{touched.email && errors.email ? <div>{errors.email}</div> : null}
						</div>
						<label>password</label>
						<Field name="password" placeholder="password" type="password" />
						<div className="text-red-400 text-xs">
							{touched.password && errors.password ? (
								<div>{errors.password}</div>
							) : null}
						</div>
						<Field as="select" name="role">
							<option value="customer" default>
								Customer
							</option>
							<option value="admin">admin</option>
							<option value="receptionist">receptionist</option>
						</Field>
						{touched.role && errors.role ? <div>{errors.role}</div> : null}
						<button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Submit"}
						</button>

						{apiMessage && <div>{JSON.stringify(apiMessage)}</div>}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default RegistrationForm;
