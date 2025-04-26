import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { fetchUserData, fetchItemData,removeItemFromCart } from "../firebase/firebaseFetch";
import { UserData } from "../types/UserData";
import { Item } from "../types/Item";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserDataAndItems = async () => {
      if (!currentUser) return;

      const user = await fetchUserData(currentUser.uid);
      if (user) {
        setUserData(user);

        const itemFetches = user.orders?.map(id => fetchItemData(id)) || [];
        const resolved = await Promise.all(itemFetches);
        setCartItems(resolved.filter(Boolean) as Item[]);
      }
    };

    loadUserDataAndItems();
  }, [currentUser]);

  const handleRemove = async (itemId: string) => {
    if (!currentUser) return;
    await removeItemFromCart(currentUser.uid, itemId);
  
    // Refresh local state
    const updatedUser = await fetchUserData(currentUser.uid);
    if (updatedUser) {
      setUserData(updatedUser);
  
      const updatedItems = await Promise.all(
        updatedUser.orders?.map(id => fetchItemData(id)) || []
      );
      setCartItems(updatedItems.filter(Boolean) as Item[]);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.06;
  const deliveryFee = cartItems.length > 0 ? 5 : 0;
  const total = subtotal + tax + deliveryFee;

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen p-6 bg-[#FAF8F2]">
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-center mb-4">
          {userData?.firstName}'s Cart
        </h1>
        <p className="text-[#1D2D1F] font-semibold text-center mb-2">
          {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in Cart
        </p>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-5">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover bg-gray-200 rounded" />
                <p className="font-semibold text-[#1D2D1F]">{item.name}</p>
              </div>
              <p className="text-[#1D2D1F] font-medium">${item.price.toFixed(2)}</p>
              <button onClick={() => handleRemove(userData?.orders?.[index] || "")}
              className="text-[#1D2D1F] hover:text-red-500">X</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        )}
      </div>

      <div className="w-full lg:w-1/3 bg-white p-6 rounded-2xl shadow-md border">
        <h2 className="text-xl font-bold mb-4 text-[#1D2D1F]">Order Summary</h2>

        <div className="flex justify-between text-[#1D2D1F] mb-2">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-[#1D2D1F] mb-2">
          <p>Tax (6%)</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-[#1D2D1F] mb-4">
          <p>Delivery Fee</p>
          <p>${deliveryFee.toFixed(2)}</p>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-[#1D2D1F] font-bold text-lg mb-6">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bg-[#7E9181] hover:bg-[#6d7e70] text-white font-semibold py-3 rounded-full transition duration-200 flex items-center justify-center gap-2"
        >
          Go to Checkout →
        </button>
      </div>
    </div>
  );
};

export default CartPage;