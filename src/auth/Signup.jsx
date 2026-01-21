import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  mapAuthError,
} from "../Service/auth";

import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";


const Input = ({ icon, type = "text", placeholder, value, onChange }) => (
  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
    <div className="text-gray-400 mr-2">{icon}</div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full outline-none text-sm"
    />
  </div>
);


const Sign = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      if (isSignUp) {
        if (!name) {
          setError("Name is required");
          return;
        }

        await registerWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }

      navigate("/home", { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
    }
  };

const handleGoogleLogin = async () => {
  setError("");
  try {
    await loginWithGoogle();
    
  } catch (err) {
    setError(mapAuthError(err));
  }
};



  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
        <h2 className="text-xl font-bold text-center mb-4">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

       
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border rounded-xl py-2.5 text-sm mb-4"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

       
        <div className="space-y-3">
          {isSignUp && (
            <Input
              icon={<FaUser />}
              placeholder="Full name"
              value={name}
              onChange={setName}
            />
          )}

          <Input
            icon={<FaEnvelope />}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />

          <Input
            icon={<FaLock />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
        </div>

        
        {error && (
          <p className="text-red-500 text-xs mt-3 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold mt-5"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

      
        <p className="text-center text-xs mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-purple-600 underline font-semibold"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Sign;
