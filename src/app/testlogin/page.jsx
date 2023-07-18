"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/login", credentials).then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <h1>Test Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
