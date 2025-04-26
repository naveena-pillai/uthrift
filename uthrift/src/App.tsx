import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/complete" element={<OrderCompletePage />} />
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </AuthProvider>
    </Router>

  );
}

export default App;
