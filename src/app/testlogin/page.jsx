"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/login", credentials)
      .then((res) => {
        if (res.status === 200) {
          setValidated(true);
        }
      })
      .catch((err) => {
        setValidated(false);
      });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/logout")
      .then((res) => {
        if (res.status === 200) {
          setValidated(false);
        }
      })
      .catch((err) => {
        setValidated(true);
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
        {validated && <button onClick={handleLogout}>Log Out</button>}
      </form>
    </div>
  );
}
