import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch {
      alert('Error: Email is not sent.');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F4EC] flex items-center justify-center overflow-hidden">
      <div className="w-[400px] text-center font-[Montserrat]">
      <div className="flex items-center justify-center mb-10 mt-[-140px]">
        <img src="/Logo.png" alt="Logo" className="transform scale-80 mb-5" />
        <img src="/DormPop.png" alt="Login header" className="transform scale-80" />
       </div>
        <h2 className="text-2xl mb-6 font-semibold text-[#2A3D66]">Reset Password</h2>
        
        {sent ? (
          <p className="text-green-700 mb-6">Password reset email sent!</p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#D9D9D9] text-[#2A3D66] text-l font-medium px-15 py-1 mb-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleReset}
              className="bg-[#739181] text-[#042A2B] px-20 py-2 rounded-full shadow-md hover:shadow-lg transition"
            >
              Send Reset Email
            </button>
          </>
        )}

        <div className="mt-8">
          <Link
            to="/login"
            className="text-[#2A3D66] font-medium px-6 py-2 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
