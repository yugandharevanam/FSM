import { 
  faHome, 
  faTasks, 
  faBell, 
  faUser,
  faSearch,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

// Navigation configuration
export const navigationConfig = [
  {
    id: 'dashboard',
    icon: faHome,
    label: 'Home',
    path: '/dashboard',
    description: 'Main dashboard'
  },
  {
    id: 'tasks',
    icon: faTasks,
    label: 'Tasks',
    path: '/tasks',
    description: 'View and manage tasks'
  },
  {
    id: 'notifications',
    icon: faBell,
    label: 'Alerts',
    path: '/notifications',
    description: 'View notifications'
  },
  {
    id: 'profile',
    icon: faUser,
    label: 'Profile',
    path: '/profile',
    description: 'User profile and settings'
  }
];

// Additional navigation items (not in tab bar)
export const additionalRoutes = [
  {
    id: 'lift-tracker',
    icon: faSearch,
    label: 'Lift Tracker',
    path: '/lift-tracker',
    description: 'Track lift status'
  },
  {
    id: 'report-issue',
    icon: faExclamationTriangle,
    label: 'Report Issue',
    path: '/report-issue',
    description: 'Report on-site issues'
  }
];

// Get tab bar items
export const getTabBarItems = () => navigationConfig;

// Get all navigation items
export const getAllNavigationItems = () => [...navigationConfig, ...additionalRoutes];

// Find navigation item by path
export const findNavigationByPath = (path) => {
  return getAllNavigationItems().find(item => item.path === path);
};

// Find navigation item by id
export const findNavigationById = (id) => {
  return getAllNavigationItems().find(item => item.id === id);
}; 