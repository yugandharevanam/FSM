import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBell,
  faCheck,
  faTrash,
  faExclamationTriangle,
  faClock,
  faCheckCircle,
  faUser,
  faMapMarkerAlt,
  faEnvelope,
  faPhone,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";

const NotificationsScreen = ({ user }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task',
      title: 'New Task Assigned',
      message: 'You have been assigned a new installation task at Tech Park Tower',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      action: 'View Task',
      data: { taskId: 'TASK001' }
    },
    {
      id: 2,
      type: 'schedule',
      title: 'Schedule Update',
      message: 'Your task at Residential Complex A has been rescheduled to 3:00 PM',
      timestamp: '15 minutes ago',
      isRead: false,
      priority: 'medium',
      action: 'Update Calendar',
      data: { taskId: 'TASK002' }
    },
    {
      id: 3,
      type: 'message',
      title: 'Message from Admin',
      message: 'Please ensure all safety protocols are followed during today\'s installation',
      timestamp: '1 hour ago',
      isRead: true,
      priority: 'normal',
      action: 'Reply',
      data: { messageId: 'MSG001' }
    },
    {
      id: 4,
      type: 'alert',
      title: 'Safety Alert',
      message: 'Weather conditions may affect outdoor installations today',
      timestamp: '2 hours ago',
      isRead: true,
      priority: 'high',
      action: 'Acknowledge',
      data: { alertId: 'ALERT001' }
    },
    {
      id: 5,
      type: 'completion',
      title: 'Task Completed',
      message: 'Installation at Office Building B has been marked as completed',
      timestamp: '3 hours ago',
      isRead: true,
      priority: 'normal',
      action: 'View Report',
      data: { taskId: 'TASK003' }
    },
    {
      id: 6,
      type: 'reminder',
      title: 'Equipment Check Due',
      message: 'Your safety equipment inspection is due tomorrow',
      timestamp: '5 hours ago',
      isRead: true,
      priority: 'medium',
      action: 'Schedule Check',
      data: { reminderId: 'REM001' }
    }
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'task':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500" />;
      case 'schedule':
        return <FontAwesomeIcon icon={faClock} className="text-yellow-500" />;
      case 'message':
        return <FontAwesomeIcon icon={faEnvelope} className="text-green-500" />;
      case 'alert':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />;
      case 'completion':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'reminder':
        return <FontAwesomeIcon icon={faBell} className="text-orange-500" />;
      default:
        return <FontAwesomeIcon icon={faBell} className="text-text-secondary" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-border-color';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleNotificationAction = (notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'task':
        alert(`Opening task: ${notification.data.taskId}`);
        break;
      case 'schedule':
        alert('Opening calendar update');
        break;
      case 'message':
        alert('Opening message reply');
        break;
      case 'alert':
        alert('Acknowledging safety alert');
        break;
      case 'completion':
        alert('Opening completion report');
        break;
      case 'reminder':
        alert('Opening equipment check scheduler');
        break;
      default:
        break;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 mb-2">
        <div>
          <h1 className="text-lg font-bold text-white">Notifications</h1>
          <p className="text-text-secondary text-xs">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={() => {
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
          }}
          className="text-accent text-xs font-medium hover:underline"
        >
          Mark all read
        </button>
      </div>

      {/* Notifications List */}
      <div className="px-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-card rounded-lg p-4 text-center py-12">
            <FontAwesomeIcon icon={faBell} className="text-text-secondary text-4xl mb-4" />
            <h3 className="text-white font-semibold text-sm mb-2">No Notifications</h3>
            <p className="text-text-secondary text-xs">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-card rounded-lg p-4 space-y-3 transition-all cursor-pointer ${
                notification.isRead ? 'opacity-75' : 'border-accent'
              } ${getPriorityColor(notification.priority)} border-l-4`}
              onClick={() => handleNotificationAction(notification)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm flex-1">
                      {notification.title}
                      {!notification.isRead && (
                        <span className="ml-2 inline-block w-2 h-2 bg-accent rounded-full"></span>
                      )}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-xs mb-2">
                    {notification.message}
                  </p>
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="w-3" />
                      <span>{notification.timestamp}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="p-2 bg-bg-input rounded hover:bg-border-color transition-colors"
                        title="Mark as read"
                      >
                        <FontAwesomeIcon icon={faCheck} className="text-green-500 text-xs" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-2 bg-bg-input rounded hover:bg-border-color transition-colors"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-red-500 text-xs" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationAction(notification);
                    }}
                    className="text-accent text-xs font-medium hover:underline"
                  >
                    {notification.action}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => alert('Opening message center')}
              className="p-4 bg-bg-input rounded-lg hover:bg-border-color transition-colors flex flex-col items-center gap-2"
            >
              <FontAwesomeIcon icon={faEnvelope} className="text-accent text-lg" />
              <span className="text-white font-medium text-sm">Messages</span>
            </button>
            
            <button
              onClick={() => alert('Opening alerts center')}
              className="p-4 bg-bg-input rounded-lg hover:bg-border-color transition-colors flex flex-col items-center gap-2"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-accent text-lg" />
              <span className="text-white font-medium text-sm">Alerts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="px-4 mt-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4">Notification Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Push Notifications</p>
                <p className="text-text-secondary text-xs">Receive instant alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Email Notifications</p>
                <p className="text-text-secondary text-xs">Daily summary emails</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-bg-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsScreen; 