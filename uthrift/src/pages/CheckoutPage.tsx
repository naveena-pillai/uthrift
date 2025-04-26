import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apt: "",
    city: "",
    postalCode: "",
    universityId: "",
    paymentFirst: "",
    paymentLast: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <div className="min-h-screen bg-[#FAF8F2] p-8">
      <h1 className="text-3xl font-bold text-[#1D2D1F] mb-8">Your Cart</h1>
      <form
        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2 bg-[#E6E3DC] p-6 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="firstName" placeholder="First name" onChange={handleChange} className="p-2 rounded" />
            <input name="lastName" placeholder="Last name" onChange={handleChange} className="p-2 rounded" />
            <input name="address" placeholder="Address" className="col-span-2 p-2 rounded" onChange={handleChange} />
            <input name="apt" placeholder="APT, suit etc. (optional)" className="col-span-2 p-2 rounded" onChange={handleChange} />
            <input name="city" placeholder="City" className="p-2 rounded" onChange={handleChange} />
            <input name="postalCode" placeholder="Postal Code" className="p-2 rounded" onChange={handleChange} />
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-4">Payment Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="paymentFirst" placeholder="First name" onChange={handleChange} className="p-2 rounded" />
            <input name="paymentLast" placeholder="Last name" onChange={handleChange} className="p-2 rounded" />
            <input name="universityId" placeholder="University ID" className="col-span-2 p-2 rounded" onChange={handleChange} />
          </div>

          <div className="flex justify-between mt-6">

            <button type="button" className="bg-[#7E9181] text-white px-6 py-2 rounded" onClick={() => navigate("/cart")}>
              Cancel Order
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border h-fit">
          <h2 className="text-xl font-bold mb-4 text-[#1D2D1F]">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>$45.00</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Tax (6%)</p>
            <p>$2.70</p>
          </div>
          <div className="flex justify-between mb-4">
            <p>Delivery Fee</p>
            <p>$15.00</p>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg mt-4 mb-6">
            <p>Total</p>
            <p>$62.70</p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7E9181] hover:bg-[#6d7e70] text-white font-semibold py-3 rounded-full transition duration-200 flex items-center justify-center gap-2"
           onClick={() => navigate("/complete")}>
            Place Order →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;