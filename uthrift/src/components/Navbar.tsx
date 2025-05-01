import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
import { fetchUserData } from "../firebase/firebaseFetch";
import { UserData } from "../types/UserData";

import logo from "../assets/dormpop_logo.png";
import profileIcon from "../assets/profile_icon.png";
import shoppingCart from "../assets/shopping_cart.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser) {
        const data = await fetchUserData(currentUser.uid);
        setUserData(data);
      }
    };
    getUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-[#7E2C1E] shadow-md">
      {/* Left Logo (Clickable) */}
      <div
        className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src={logo} alt="Dormpop Logo" className="h-8 w-auto" />
      </div>

      {/* Center Brand Text (Clickable) */}
      <div
        className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src="/DormPop.png" alt="DormPop Text" className="h-10 w-auto" />
      </div>

      {/* Right Icons */}
      <div className="flex items-center space-x-6 relative">
        {/* Cart icon (for buyers only) */}
        {userData?.role !== "seller" && (
          <img
            src={shoppingCart}
            alt="Cart"
            onClick={() => navigate("/cart")}
            className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform"
          />
        )}

        {/* Profile icon + dropdown */}
        <div className="relative">
          <img
            src={profileIcon}
            alt="Profile"
            onClick={handleProfileClick}
            className="w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform"
          />
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {userData?.role === "seller" && (
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowDropdown(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left rounded-t-lg transition-colors"
                >
                  Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-[#7E2C1E] hover:text-white text-left ${
                  userData?.role === "seller" ? "rounded-b-lg" : "rounded-lg"
                } transition-colors`}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
