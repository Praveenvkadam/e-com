import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

import {startPayment,paymentSuccess,resetPayment} from "@/redux/slices/paymentSlice";

import { clearCart } from "@/redux/slices/cartSlice";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.payment.status);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = () => {
    if (status === "loading" || totalAmount === 0) return;

    dispatch(startPayment());

    setTimeout(() => {
      dispatch(paymentSuccess());
    }, 2000);
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(clearCart());
      dispatch(resetPayment());
      navigate("/home");
    }
  }, [status, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold">Checkout</h1>
            <p className="text-sm text-gray-500 mt-1">
              Secure payment (simulated)
            </p>
          </div>

          <div className="p-6 space-y-4">
            {items.length === 0 && (
              <p className="text-sm text-gray-500 text-center">
                Your cart is empty
              </p>
            )}

            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-lg pt-4 border-t border-gray-200">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePay}
              disabled={status === "loading" || totalAmount === 0}
              className="w-full mt-4 rounded-xl bg-black text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed py-3 font-medium"
            >
              {status === "loading" ? "Processing…" : "Pay now"}
            </button>

            {status === "loading" && (
              <div className="flex justify-center py-6">
                <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-black animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
