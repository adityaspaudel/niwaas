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

  const handleClick = () => router.push("/register");
  return (
    <div className="flex flex-col justify-center items-center bg-pink-200 h-screen w-screen text-black">
      <div className="flex flex-col gap-2 px-8 py-8 justify-center items-center rounded-xl border-gray-600  w-1/3  bg-gray-200 shadow hover:shadow-md hover:shadow-black transition ">
        <h1 className="font-bold w-full text-2xl flex flex-col text-start mb-2 ">
          Login
        </h1>
        <Formik
          initialValues={formData}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            await sleep(500);
            // alert(JSON.stringify(values, null, 2));
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
              else if (data.role == "guest")
                router.push(`/guest/${data.id}/home`);
              else if (data.role == "staff")
                router.push(`/staff/${data.id}/home`);
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
            <Form className="flex flex-col gap-2 content-start items-start  w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="email">Email</label>
                <Field
                  className="py-1 px-2 border rounded-4xl bg-gray-200 w-full"
                  name="email"
                  placeholder="jane@acme.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password">Password</label>
                <Field
                  className="py-1 px-2 border rounded-4xl bg-gray-200 w-full"
                  name="password"
                  placeholder="password"
                  type="password"
                />
              </div>
              <button
                className="mt-2 text text-gray-50 bg-pink-500 transition hover:bg-pink-600 rounded-4xl py-1 px-4 cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                login
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-sm">
          Don`t have an account?{" "}
          <span
            onClick={handleClick}
            className="hover:underline hover:text-blue-400 cursor-pointer"
          >
            Register here
          </span>
        </div>
        {apiMessage && (
          <div>
            {apiMessage == "login successful" ? (
              <div className="text-green-400">{apiMessage}</div>
            ) : (
              <div className="text-red-400 rounded"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default LoginForm;
