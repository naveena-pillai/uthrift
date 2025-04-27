// Google login or email/password
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/UserData";
import { Link } from "react-router-dom";


export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
      const userData = userDoc.data() as UserData;

      navigate(userData.role === "buyer" ? "/home" : "/profile");
    } catch {
      alert("Login unsucessful.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F4EC] flex flex-col items-center justify-center overflow-hidden font-[Montserrat]">
       <div className="flex items-center justify-center mb-10 mt-[-140px]">
        <img src="/Logo.png" alt="Logo" className="transform scale-80 mb-5" />
        <img src="/DormPop.png" alt="Login header" className="transform scale-80 mr-3" />
       </div>
      <h2 className="text-3xl mb-6 text-[#2A3D66]">Login</h2>
      {/* email entry  */}
      <div className="flex items-center mb-4">
        <label className="w-32 text-right mr-4 text-[#2A3D66] text-xl">Email:</label>
        <input className="bg-[#D9D9D9] text-[#2A3D66] font-medium px-10 py-2 mr-25"
            placeholder="Type Here" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      {/* password entry */}
      <div className="flex items-center mb-1">
        <label className="w-32 text-right mr-4 text-[#2A3D66] text-xl">Password:</label>
        <input className="bg-[#D9D9D9] text-[#2A3D66] font-medium px-10 py-2 mr-25 mb-3"
            placeholder="Type Here" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <Link
            to="/forgotPassword"
            className="underline bg-[#D9D9D9] text-[#2A3D66] text-xs px-5 py-1 mb-5 "
        >
        Forgot password?
      </Link>
      <button onClick={handleLogin} className="bg-[#739181] text-[#042A2B] px-20 py-2 rounded-full shadow-md hover:shadow-lg transition">Log In</button>
      <div className="mt-8 text-center">
        <p className="text-[#2A3D66] mb-2">Don’t have an account? <span className="font-medium">Sign up!</span></p>
        <Link
            to="/signup"
            className="inline-block bg-[#D9D9D9] text-[#1F2937] font-semibold px-8 py-3 text-lg shadow-[10px_10px_0px_#F2CFCF] hover:shadow-[8px_8px_0px_#f2cfcf] transition"
        >
        Sign up!
        </Link>
        </div>
    </div>
  );
}