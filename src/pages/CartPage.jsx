import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="border rounded-lg p-10 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty.</p>
            <Link
              to="/home"
              className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr_auto] gap-4 items-center border rounded-lg p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />

                  <div>
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="w-8 h-8 border rounded"
                      >
                        −
                      </button>

                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-8 h-8 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

             <Link to="/payment"> <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                Proceed to Checkout
              </button></Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
