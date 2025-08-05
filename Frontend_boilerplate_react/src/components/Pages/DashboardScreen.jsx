import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faClock, 
  faPlay, 
  faArrowRight,
  faExclamationTriangle,
  faCheckCircle,
  faCalendarAlt,
  faSearch,
  faQrcode
} from "@fortawesome/free-solid-svg-icons";

const DashboardScreen = ({ user }) => {
  const navigate = useNavigate();

  // Mock data
  const nextTask = {
    id: "TASK001",
    liftId: "LIFT-2024-001",
    siteName: "Tech Park Tower",
    address: "123 Innovation Drive, Downtown",
    status: "assigned",
    eta: "09:30 AM",
    type: "Installation",
    priority: "high"
  };

  const upcomingTasks = [
    {
      id: "TASK002",
      liftId: "LIFT-2024-002",
      siteName: "Residential Complex A",
      address: "456 Green Street, Suburb",
      time: "02:00 PM",
      status: "scheduled",
      type: "Maintenance"
    },
    {
      id: "TASK003",
      liftId: "LIFT-2024-003",
      siteName: "Office Building B",
      address: "789 Business Ave, City Center",
      time: "04:30 PM",
      status: "scheduled",
      type: "Inspection"
    },
    {
      id: "TASK004",
      liftId: "LIFT-2024-004",
      siteName: "Shopping Mall C",
      address: "321 Retail Road, Mall District",
      time: "Tomorrow 10:00 AM",
      status: "pending",
      type: "Repair"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      assigned: { class: 'badge-warning', text: 'Assigned' },
      scheduled: { class: 'badge-info', text: 'Scheduled' },
      pending: { class: 'badge-danger', text: 'Pending' },
      completed: { class: 'badge-success', text: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const getPriorityIcon = (priority) => {
    return priority === 'high' ? (
      <FontAwesomeIcon icon={faExclamationTriangle} className="text-accent text-sm" />
    ) : null;
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 mb-2">
        <div>
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
          <p className="text-text-secondary text-xs">Welcome back, {user.name}</p>
        </div>
      </div>

      {/* Next Assigned Task Card */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-1">
                <h3 className="text-white font-semibold text-sm flex-1">Next Assigned Task</h3>
                {getPriorityIcon(nextTask.priority)}
              </div>
              <p className="text-text-secondary text-xs mb-2">{nextTask.liftId}</p>
              <div className="flex flex-col gap-1 text-xs text-text-secondary">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />
                  <span className="truncate">{nextTask.siteName}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="w-3" />
                  <span>ETA: {nextTask.eta}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-3" />
                  <span>{nextTask.type}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              {getStatusBadge(nextTask.status)}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border-color">
            <span className="text-xs text-text-secondary">{nextTask.address}</span>
            <button
              onClick={() => navigate(`/task/${nextTask.id}`)}
              className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white rounded text-xs font-medium"
            >
              <FontAwesomeIcon icon={faPlay} className="text-xs" />
              Start Task
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/lift-tracker')}
            className="bg-card rounded-lg p-4 hover:bg-border-color transition-colors flex flex-col items-center justify-center space-y-2"
          >
            <FontAwesomeIcon icon={faSearch} className="text-accent text-lg" />
            <span className="text-white font-medium text-sm">Track Lift</span>
            <span className="text-text-secondary text-xs">Scan QR Code</span>
          </button>

          <button
            onClick={() => navigate('/report-issue')}
            className="bg-card rounded-lg p-4 hover:bg-border-color transition-colors flex flex-col items-center justify-center space-y-2"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-accent text-lg" />
            <span className="text-white font-medium text-sm">Report Issue</span>
            <span className="text-text-secondary text-xs">On-site Problems</span>
          </button>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Upcoming Tasks</h2>
          <button 
            onClick={() => navigate('/tasks')}
            className="text-accent text-xs font-medium hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {upcomingTasks.map((task, index) => (
            <div
              key={task.id}
              className="bg-card rounded-lg p-4 space-y-3 cursor-pointer"
              onClick={() => navigate(`/task/${task.id}`)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm flex-1">{task.siteName}</h3>
                  </div>
                  <p className="text-text-secondary text-xs mb-2">{task.liftId}</p>
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />
                      <span className="truncate">{task.address}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faClock} className="w-3" />
                      <span>{task.time}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(task.status)}
                  <span className="text-xs text-text-secondary">{task.type}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border-color">
                <span className="text-xs text-text-secondary">Scheduled</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/task/${task.id}`);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white rounded text-xs font-medium"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-xs" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Summary */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-3">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-accent">5</div>
              <div className="text-text-secondary text-xs">Total Tasks</div>
            </div>
            <div>
              <div className="text-xl font-bold text-green-500">2</div>
              <div className="text-text-secondary text-xs">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-yellow-500">3</div>
              <div className="text-text-secondary text-xs">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen; 