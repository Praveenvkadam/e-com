import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sign from "./auth/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { startAuthListener } from "./redux/Listener/authListener";
import { handleGoogleRedirectResult } from "./Service/auth";
import { setAuthUser } from "./redux/slices/authSlice";


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
  const initAuth = async () => {
    try {
      const redirectUser = await handleGoogleRedirectResult();
      if (redirectUser) {
        dispatch(setAuthUser(redirectUser));
      }
    } catch (err) {
      console.error("Google redirect error:", err);
    }
  };

  initAuth();

  const unsubscribe = startAuthListener(dispatch);
  return unsubscribe;
}, [dispatch]);


  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/home" replace /> : <Sign />}
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/" replace />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/" replace />}
      />
      <Route
        path="/cart"
        element={user ? <CartPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/payment"
        element={user ? <PaymentPage /> : <Navigate to="/" replace />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
