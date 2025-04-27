import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import GoogleChooseRole from "./pages/GoogleChooseRole";
import CartPage from "./pages/CartPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import CheckoutPage from "./pages/CheckoutPage";
import { ItemProvider } from "./context/ItemContext";

function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/complete" element={<OrderCompletePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/choose-role" element={<GoogleChooseRole />} />
          </Routes>
        </Router>
      </ItemProvider>
    </AuthProvider>
  );
}

export default App;
