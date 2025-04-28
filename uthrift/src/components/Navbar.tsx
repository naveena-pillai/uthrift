import { useNavigate } from "react-router-dom";
import shoppingCart from "../assets/shopping_cart.png";
import profileIcon from "../assets/profile_icon.png";
import logo from "../assets/dormpop_logo.png";
import { useAuth } from "../context/AuthContext";
import { fetchUserData } from "../firebase/firebaseFetch";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { UserData } from "../types/UserData";

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

  const handleProfileClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Logout logic
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-2 bg-[#7E2C1E] shadow-md">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src={logo} alt="Logo" className="h-8 w-auto" />
      </div>

      <div
        className="flex justify-center cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <img src="/DormPop.png" alt="DormPop Logo" className="h-10 w-auto" />
      </div>

      <div className="flex items-center space-x-6 justify-end relative">
        <img
          src={shoppingCart}
          alt="Shopping Cart"
          className="w-8 h-8 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
        <div className="relative">
          <img
            src={profileIcon}
            alt="Profile"
            className="w-8 h-8 cursor-pointer rounded-full"
            onClick={handleProfileClick}
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
