import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { UserData } from "../types/UserData";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSignup = async (selectedRole: UserData["role"]) => {
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData: UserData = {
        email,
        firstName,
        lastName,
        role: selectedRole,
      };
      await setDoc(doc(db, "users", userCred.user.uid), userData);
      navigate(userData.role === "buyer" ? "/home" : "/profile");
    } catch {
      alert("Signup failed: Please check all fields and try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-[#F8F4EC] overflow-hidden">
      <div className="flex flex-col items-center font-[Montserrat] ">
        <h2 className="text-3xl mb-10 text-[#042A2B] mr-5">
          New User Information
        </h2>
        {/* first name entry */}
        <div className="flex items-center mb-4 mr-10">
          <label className="w-35 text-right mr-4 font-medium text-[#042A2B]">
            First Name:
          </label>
          <input
            className="w-full px-4 py-2 rounded-full border-2 border-[#731b15] bg-[#E8E2D5] placeholder-[#D3CFC7] focus:outline-none focus:ring-2 focus:ring-[#7B2C29]"
            placeholder="Type Here"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        {/* last name entry */}
        <div className="flex items-center mb-4 mr-10">
          <label className="w-35 text-right mr-4 font-medium text-[#042A2B]">
            Last Name:
          </label>
          <input
            className="w-full px-4 py-2 rounded-full border-2 border-[#731b15] bg-[#E8E2D5] placeholder-[#D3CFC7] focus:outline-none focus:ring-2 focus:ring-[#7B2C29]"
            placeholder="Type Here"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {/* email entry  */}
        <div className="flex items-center mb-4 mr-10">
          <label className="w-35 text-right mr-4 font-medium text-[#042A2B]">
            Email:
          </label>
          <input
            className="w-full px-4 py-2 rounded-full border-2 border-[#731b15] bg-[#E8E2D5] placeholder-[#D3CFC7] focus:outline-none focus:ring-2 focus:ring-[#7B2C29]"
            placeholder="Type Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* password entry */}
        <div className="flex items-center mb-10 mr-10">
          <label className="w-35 text-right mr-4 font-medium text-[#042A2B]">
            Password:
          </label>
          <input
            className="w-full px-4 py-2 rounded-full border-2 border-[#731b15] bg-[#E8E2D5] placeholder-[#D3CFC7] focus:outline-none focus:ring-2 focus:ring-[#7B2C29]"
            placeholder="Type Here"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-10 mr-10 ">
          <button
            onClick={() => handleSignup("buyer")}
            className="bg-[#739181] text-[#042A2B] px-6 py-2 rounded-full shadow-md hover:shadow-lg transition transition transform duration-200 hover:scale-105"
          >
            I want to BUY
          </button>
          <button
            onClick={() => handleSignup("seller")}
            className="bg-[#739181] text-[#042A2B] px-6 py-2 rounded-full shadow-md hover:shadow-lg transition transition transform duration-200 hover:scale-105"
          >
            I want to SELL
          </button>
        </div>
      </div>
    </div>
  );
}
