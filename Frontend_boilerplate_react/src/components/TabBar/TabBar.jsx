import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTabBarItems } from "../../config/navigation";

const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabs = getTabBarItems();

  // Get current active tab based on location
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const activeTab = tabs.find(tab => {
      // Exact match for dashboard
      if (tab.path === '/dashboard' && currentPath === '/dashboard') {
        return true;
      }
      // For other paths, check if current path starts with tab path
      return currentPath.startsWith(tab.path) && tab.path !== '/dashboard';
    });
    return activeTab ? activeTab.id : 'dashboard';
  };

  const handleTabClick = (tab) => {
    navigate(tab.path);
  };

  const activeTabId = getActiveTab();

  return (
    <div className="tab-bar">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            <FontAwesomeIcon icon={tab.icon} />
            <span>{tab.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar; 