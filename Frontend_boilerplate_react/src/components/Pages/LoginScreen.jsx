import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash,
  faBuilding
} from "@fortawesome/free-solid-svg-icons";

const LoginScreen = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple login without verification - directly go to dashboard
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-primary">
      <div className="w-full max-w-sm">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full mb-6 shadow-lg">
            <FontAwesomeIcon icon={faBuilding} className="text-white text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">EliteConstruct</h1>
          <p className="text-text-secondary text-lg">Field Service Management</p>
        </div>

        {/* Login Form */}
        <div className="card shadow-xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Technician Login</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-text-secondary" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-bg-input border border-border-color rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-text-secondary" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-bg-input border border-border-color rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition-all"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon 
                    icon={showPassword ? faEyeSlash : faEye} 
                    className="text-text-secondary hover:text-white transition-colors" 
                  />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-accent text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg-primary shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Quick Access */}
          <div className="mt-8 pt-6 border-t border-border-color">
            <button
              onClick={onLogin}
              className="w-full bg-bg-input text-text-secondary py-3 px-4 rounded-lg font-medium hover:bg-border-color transition-colors border border-border-color"
            >
              Quick Access (Demo Mode)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-text-muted text-sm">
            © 2024 EliteConstruct. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 