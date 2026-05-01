// src/pages/Signup.jsx
import { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";

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
    try {
      await API.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Start managing your projects 🚀
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;