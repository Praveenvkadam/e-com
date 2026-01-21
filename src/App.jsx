import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Sign from "./auth/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import { startAuthListener } from "./redux/Listener/authListener";
import { handleGoogleRedirectResult } from "./Service/auth"; 

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = startAuthListener(dispatch);
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await handleGoogleRedirectResult();
        if (res?.user) {
          navigate("/home");
        }
      } catch (err) {
        console.log("Google redirect error:", err);
      }
    };

    run();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Sign />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
