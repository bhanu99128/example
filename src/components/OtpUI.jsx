import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OtpUI.css";

function OtpUI() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [showOtp, setShowOtp] = useState(false);
  const [message, setMessage] = useState("");

  const inputsRef = useRef([]);

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔹 SEND OTP
  const sendOtp = async () => {
    if (!email) {
      setMessage("Enter email");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/otp/send?email=${email}`,
      { method: "POST" }
    );

    const text = await res.text();
    setMessage(text);
    setShowOtp(true);
  };

  // 🔹 VERIFY OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setMessage("Enter full OTP");
      return;
    }

    const res = await fetch(
      `http://localhost:8080/otp/verify?email=${email}&otp=${enteredOtp}`,
      { method: "POST" }
    );

    const text = await res.text();
    setMessage(text);

    if (text.includes("Verified")) {
      navigate("/home"); // ✅ redirect after success
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">

        <h2>Email Verification</h2>
        <p className="subtitle">
          Enter your email to receive OTP
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!showOtp && (
          <button onClick={sendOtp}>
            Send OTP
          </button>
        )}

        {showOtp && (
          <>
            <div className="otp-boxes">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => inputsRef.current[index] = el}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button className="verify-btn" onClick={verifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      </div>
    </div>
  );
}

export default OtpUI;
