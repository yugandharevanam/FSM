import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Import all screens
import DashboardScreen from "../components/Pages/DashboardScreen";
import TasksScreen from "../components/Pages/TasksScreen";
import TaskDetailScreen from "../components/Pages/TaskDetailScreen";
import ComplianceChecklistScreen from "../components/Pages/ComplianceChecklistScreen";
import LiftTrackerScreen from "../components/Pages/LiftTrackerScreen";
import ReportIssueScreen from "../components/Pages/ReportIssueScreen";
import NotificationsScreen from "../components/Pages/NotificationsScreen";
import ProfileScreen from "../components/Pages/ProfileScreen";

// App Routes Component
const AppRoutes = ({ user, onLogout }) => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Main Dashboard */}
      <Route 
        path="/dashboard" 
        element={<DashboardScreen user={user} />} 
      />
      
      {/* Tasks */}
      <Route 
        path="/tasks" 
        element={<TasksScreen user={user} />} 
      />
      
      {/* Task Management */}
      <Route 
        path="/task/:taskId" 
        element={<TaskDetailScreen user={user} />} 
      />
      
      {/* Compliance */}
      <Route 
        path="/compliance/:taskId" 
        element={<ComplianceChecklistScreen user={user} />} 
      />
      
      {/* Lift Tracker */}
      <Route 
        path="/lift-tracker" 
        element={<LiftTrackerScreen user={user} />} 
      />
      
      {/* Report Issue */}
      <Route 
        path="/report-issue" 
        element={<ReportIssueScreen user={user} />} 
      />
      
      {/* Notifications */}
      <Route 
        path="/notifications" 
        element={<NotificationsScreen user={user} />} 
      />
      
      {/* Profile */}
      <Route 
        path="/profile" 
        element={<ProfileScreen user={user} onLogout={onLogout} />} 
      />
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes; 