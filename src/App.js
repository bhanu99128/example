import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import CardForm from "./pages/cardform";
import Payment from "./pages/payment";
import MyCards from "./pages/mycards";
import OtpUI from "./components/OtpUI";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default & Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* OTP Page */}
        <Route path="/otp" element={<OtpUI />} />

        {/* Other pages */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cardform" element={<CardForm />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/cards/mycards" element={<MyCards />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
