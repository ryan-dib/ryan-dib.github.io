import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    setLoading(true);
    setMessage('');  // Reset message

    try {
      // Send the email to the backend to trigger OTP generation and sending
      const response = await axios.post('http://localhost:5000/send-otp', { email });

      // Handle success response
      setMessage(response.data.message);
    } catch (error) {
      // Handle error response
      setMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <h2 className="forgot-password-title">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="forgot-password-textbox">
              <label htmlFor="email">Enter your email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="forgot-password-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Submit'}
            </button>
          </form>

          {message && <div className="message">{message}</div>}

          <p className="forgot-password-p">
            Remembered your password? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
