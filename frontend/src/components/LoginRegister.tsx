import React, { useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

interface FormData {
  username: string;
  email?: string;
  password: string;
}

const LoginRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "" });
  const [message, setMessage] = useState<string>("");
  const [passwordType, setPasswordType] = useState('password');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? 'http://localhost:8000/api/login/' // Login API
        : 'http://localhost:8000/api/register/'; // Register API
      const payload = isLogin ? { username: formData.username, password: formData.password } : formData;

      const response = await axios.post(endpoint, payload);

      if (response.data.access) {
        alert('Login successful');
        console.log('Access Token:', response.data.access);
        // Handle successful login, e.g., store the token, navigate, etc.
      } else {
        alert(response.data.message || 'Registration successful');
      }
      setMessage(isLogin ? "Login successful" : "Registration successful");
    } catch (error) {
      setMessage("Error: " + (error as any).response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />

        {!isLogin && <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />}

        <div className="password-wrapper"> {/* Wrap input and icon */}
          <input type={passwordType} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {passwordType === 'password' ? (
              <FontAwesomeIcon icon={faEye} /> // Eye icon (Font Awesome)
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} /> // Eye with slash icon (Font Awesome)
            )}
          </span>
        </div>

        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      {message && <p>{message}</p>}
      <a onClick={() => setIsLogin(!isLogin)} className="switch-form-button">
        Switch to {isLogin ? "Register" : "Login"}
      </a>
    </div>
  );
};

export default LoginRegister;
