// src/pages/Signup.jsx
import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Signup</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="bg-green-500 text-white p-2">Signup</button>
      </form>
    </div>
  );
};

export default Signup;