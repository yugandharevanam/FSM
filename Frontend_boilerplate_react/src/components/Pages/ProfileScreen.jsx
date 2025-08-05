import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser,
  faEnvelope,
  faPhone,
  faIdCard,
  faSun,
  faMoon,
  faGlobe,
  faSignOutAlt,
  faCog,
  faShieldAlt,
  faQuestionCircle,
  faInfoCircle,
  faBell,
  faMapMarkerAlt,
  faClock,
  faTrophy,
  faStar,
  faCheck,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

const ProfileScreen = ({ user, onLogout }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState('en');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
  ];

  const stats = [
    { label: 'Tasks Completed', value: '127', icon: faTrophy, color: 'text-yellow-500' },
    { label: 'Hours Worked', value: '1,240', icon: faClock, color: 'text-blue-500' },
    { label: 'Sites Visited', value: '89', icon: faMapMarkerAlt, color: 'text-green-500' },
    { label: 'Rating', value: '4.8', icon: faStar, color: 'text-accent' }
  ];

  const menuItems = [
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: faBell,
      action: () => alert('Opening notification settings')
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: faShieldAlt,
      action: () => alert('Opening security settings')
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: faQuestionCircle,
      action: () => alert('Opening help center')
    },
    {
      id: 'about',
      title: 'About App',
      icon: faInfoCircle,
      action: () => alert('Opening about page')
    }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    // In real app, this would update the app language
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowLogoutConfirm(false);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="text-center p-4 mb-2">
        <h1 className="text-lg font-bold text-white">Profile</h1>
        <p className="text-text-secondary text-xs">Manage your account settings</p>
      </div>

      {/* User Profile Card */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faUser} className="text-white text-2xl" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-accent font-medium text-sm mb-2">{user.role}</p>
            <p className="text-text-secondary text-xs">Employee ID: {user.id}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} className="text-text-secondary w-4" />
              <span className="text-text-secondary text-sm">john.smith@eliteconstruct.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} className="text-text-secondary w-4" />
              <span className="text-text-secondary text-sm">+1 (555) 987-6543</span>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faIdCard} className="text-text-secondary w-4" />
              <span className="text-text-secondary text-sm">Certified Lift Technician</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4">Your Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-bg-input rounded-lg">
                <FontAwesomeIcon icon={stat.icon} className={`text-xl mb-2 ${stat.color}`} />
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-text-secondary text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} className="text-accent" />
            Appearance
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium text-sm">Dark Theme</p>
              <p className="text-text-secondary text-xs">Use dark mode for better visibility</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isDarkTheme}
                onChange={toggleTheme}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faGlobe} className="text-accent" />
            Language
          </h3>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  language === lang.code
                    ? 'bg-accent text-white'
                    : 'bg-bg-input text-text-secondary hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium text-sm">{lang.name}</span>
                  {language === lang.code && (
                    <FontAwesomeIcon icon={faCheck} className="ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCog} className="text-accent" />
            Settings
          </h3>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full p-3 bg-bg-input rounded-lg text-left hover:bg-border-color transition-colors flex items-center gap-3"
              >
                <FontAwesomeIcon icon={item.icon} className="text-accent" />
                <span className="text-white font-medium text-sm">{item.title}</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-text-secondary ml-auto" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* App Version */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4 text-center">
          <p className="text-text-secondary text-xs">
            EliteConstruct FSM v1.0.0
          </p>
          <p className="text-text-muted text-xs mt-1">
            © 2024 EliteConstruct. All rights reserved.
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-4 max-w-sm w-full">
            <h3 className="text-white font-semibold text-sm mb-4 text-center">Confirm Logout</h3>
            <p className="text-text-secondary text-xs text-center mb-6">
              Are you sure you want to logout? You'll need to sign in again to access the app.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2 px-4 bg-bg-input text-white rounded-lg font-medium hover:bg-border-color transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen; 