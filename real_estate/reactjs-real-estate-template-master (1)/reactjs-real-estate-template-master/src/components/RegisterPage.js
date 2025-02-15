import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Import styles for the phone input

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [countryCode,setCountryCode]= useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(country);
    console.log(phoneNumber);
    

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!'); 
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        phoneNumber, // Send the formatted phone number with country code
        countryCode,
        country,
        password,
        
      });

      console.log(response.data.message);
      window.location.href = '/login';

    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="register-textbox">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={30} // Limit the name input to 30 characters
                placeholder="(30 characters maximum)" style={{fontSize: "small"}}    
              />
            </div>
            <div className="register-textbox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={30}
                placeholder="ex: (user@gmail.com)" style={{fontSize: "small"}}    
              />
            </div>
            <div className="register-textbox">
              <label htmlFor="phone">Phone Number</label>
              <PhoneInput
                country={'lb'} // Default country set to Lebanon
                value={phoneNumber}
                onChange={(value, country) => {setPhoneNumber(value); setCountry(country.name); setCountryCode(country.dialCode)}}
                inputProps={{
                  required: true,
                  name: 'phone',
                  id: 'phone',
                }}
                isValid={(value, country) => {
                  // Validate Lebanon phone number to ensure it's 8 digits after the country code
                  if (country?.countryCode === 'lb') {
                    const phoneNumberWithoutCountryCode = value.replace(`+961`, ''); // Remove Lebanon's country code
                    return phoneNumberWithoutCountryCode.length === 8; // Valid only if there are exactly 8 digits
                  }
                  return true; // No validation for other countries
                }}
                containerClass="phone-input-container"
                inputClass="phone-input"
              />
            </div>
            <div className="register-textbox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                maxLength={30}
                placeholder="(maximum length: 30)" style={{fontSize: "small"}}    
              />
            </div>
            <div className="register-textbox">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                maxLength={30}
                placeholder="(maximum length: 30)" style={{fontSize: "small"}}    
              />
            </div>
            {error && <div className="error-message" style={{color: "red"}}>{error}</div>}
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <p className="register-p">
            Already have an account? <a href="/login" className="login-link">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
