import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ItemProvider } from "./Context/ItemContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ItemProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </ItemProvider>
  );
}

export default App;