"use client";

import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleClick = () => router.push("/login");
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
      <div className="flex flex-col items-center content-start bg-pink-200 gap-2 shadow hover:shadow-md shadow-black  p-8 min-h-1/2 w-1/3">
        <h1 className="text-start flex flex-col items-start content-start w-full font-bold text-2xl">
          Sign Up
        </h1>
        <Formik
          className="flex flex-col gap-2 bg-pink-200"
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
                role: "guest",
              });
              setApiMessage(msg);
            } catch (error) {
              console.error("could not submit registration form data", error);
              setApiMessage(error.message);
            } finally {
              setTimeout(() => setApiMessage(null), [5000]);
            }
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="flex flex-col gap-2 content-start items-start text-black w-full">
              <div className=" flex flex-col w-full">
                <label htmlFor="fullName">Full Name</label>
                <Field
                  name="fullName"
                  className=" bg-white w-full px-2 py-1 rounded-4xl"
                  placeholder="Jane"
                />
                <div className="text-red-400 text-xs">
                  {touched.fullName && errors.fullName ? (
                    <div>{errors.fullName}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  className=" bg-white w-full px-2 py-1 rounded-4xl"
                  placeholder="Jane"
                />
                <div className="text-red-400 text-xs">
                  {touched.username && errors.username ? (
                    <div>{errors.username}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  className="] bg-white w-full px-2 py-1 rounded-4xl"
                  placeholder="jane@acme.com"
                  type="email"
                />
                <div className="text-red-400 w-full text-xs">
                  {touched.email && errors.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <label>Password</label>
                <Field
                  name="password"
                  className=" bg-white w-full px-2 py-1 rounded-4xl"
                  placeholder="password"
                  type="password"
                />
                <div className="text-red-400 text-xs">
                  {touched.password && errors.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <Field as="select" className="bg-white rounded-4xl py-1 px-2" name="role">
                <option value="guest">Guest</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </Field>
              {touched.role && errors.role ? <div>{errors.role}</div> : null}
              <button
                className="bg-pink-500 hover:bg-pink-600 text-white px-2 rounded-2xl mt-2 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up" : "Sign up"}
              </button>
              {apiMessage && (
                <div>
                  {apiMessage === "registration successful" ? (
                    <div className="text-green-400">{apiMessage}</div>
                  ) : (
                    <div className="text-red-400">{apiMessage}</div>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
        <div className="text-sm">
          Already have an account?{" "}
          <span
            onClick={handleClick}
            className="hover:text-blue-400 hover:underline cursor-pointer"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
