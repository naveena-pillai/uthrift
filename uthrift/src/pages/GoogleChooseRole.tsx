import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { UserData} from "../types/UserData";

export default function ChooseRolePage() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get firstName, lastName, email passed from LoginPage
  const { firstName, lastName, email } = location.state || { firstName: "", lastName: "", email: "" };

  const handleChooseRole = async (role: "buyer" | "seller") => {
    if (!currentUser) return;
    try {
      const userData: UserData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        role,
      };
      await setDoc(doc(db, "users", currentUser.uid), userData);
      navigate(role === "buyer" ? "/home" : "/profile");
    } catch (error) {
      alert("Failed to save role. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F4EC] font-[Montserrat]">
        <div className="flex items-center justify-center mb-10 mt-[-100px]">
            <img src="/Logo.png" alt="Logo" className="transform scale-80 mb-5" />
            <img src="/DormPop.png" alt="Login header" className="transform scale-80" />
        </div>
      <h2 className="text-2xl mb-6 text-[#2A3D66] text-center max-w-md">You have successfuly signed in with Google! To proceed, please indicate whether you are a buyer or a seller.</h2>
      <div className="flex gap-6">
        <button
          onClick={() => handleChooseRole("buyer")}
          className="bg-[#739181] text-[#042A2B] px-6 py-2 rounded-full shadow-md hover:shadow-lg transition transition transform duration-200 hover:scale-105"
        >
          I am a Buyer
        </button>
        <button
          onClick={() => handleChooseRole("seller")}
          className="bg-[#739181] text-[#042A2B] px-6 py-2 rounded-full shadow-md hover:shadow-lg transition transition transform duration-200 hover:scale-105"
        >
          I am a Seller
        </button>
      </div>
    </div>
  );
}
