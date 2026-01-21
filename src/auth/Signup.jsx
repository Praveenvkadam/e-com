import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  mapAuthError,
} from "../Service/auth";
import { signOut } from "firebase/auth";

import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhoneAlt,
  FaGoogle,
  FaShoppingBag,
} from "react-icons/fa";

const Input = ({ icon, type = "text", placeholder, value, onChange }) => {
  return (
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
};

const Sign = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Email and password are required");
        return;
      }

      if (isSignUp) {
        // Manual signup
        await registerWithEmail(email, password, name);

        // Firebase auto-logs in after signup — force logout
        await signOut(auth);

        // Switch back to Sign In
        setIsSignUp(false);
        setPassword("");
      } else {
        // Manual login
        await loginWithEmail(email, password);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(mapAuthError(err));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      await loginWithGoogle();
      navigate("/home", { replace: true });
    } catch (err) {
      setError(mapAuthError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-center mb-4">
          <FaShoppingBag className="text-purple-600 text-3xl mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ShopHub
          </h1>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition mb-4"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Continue with Google
        </button>

        <div className="space-y-3">
          {isSignUp && (
            <>
              <Input
                icon={<FaUser />}
                placeholder="Full name"
                value={name}
                onChange={setName}
              />
              <Input
                icon={<FaPhoneAlt />}
                placeholder="Phone number"
                value={phone}
                onChange={setPhone}
              />
            </>
          )}

          <Input
            icon={<FaEnvelope />}
            placeholder="Email address"
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
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-base mt-5"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className="text-center text-gray-600 text-xs mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 font-semibold underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Sign;
