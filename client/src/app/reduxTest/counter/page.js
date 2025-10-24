"use client";

import { decrement, increment, reset } from "@/lib/redux/slices/counterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Counter() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div style={{ textAlign: "center", marginTop: "50px" }}>
			<h1>Redux Toolkit + Persist + Logger Demo</h1>
			<h2>Count: {count}</h2>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(reset())}>Reset</button>
		</div>
	);
}

export default Counter;
