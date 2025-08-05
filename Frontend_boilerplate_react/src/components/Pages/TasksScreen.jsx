import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faSearch,
  faFilter,
  faCalendar,
  faMapMarkerAlt,
  faClock,
  faCheckCircle,
  faExclamationTriangle,
  faPlay
} from "@fortawesome/free-solid-svg-icons";

const TasksScreen = ({ user }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock tasks data
  const tasks = [
    {
      id: "TASK001",
      title: "Lift Installation - Building A",
      site: "Downtown Office Complex",
      address: "123 Main St, Downtown",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-01-15",
      assignedTo: "John Smith",
      liftId: "LIFT-2024-001"
    },
    {
      id: "TASK002",
      title: "Maintenance Check - Building B",
      site: "Shopping Mall",
      address: "456 Commerce Ave",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-18",
      assignedTo: "John Smith",
      liftId: "LIFT-2024-002"
    },
    {
      id: "TASK003",
      title: "Safety Inspection - Building C",
      site: "Residential Complex",
      address: "789 Housing Blvd",
      status: "completed",
      priority: "low",
      dueDate: "2024-01-12",
      assignedTo: "John Smith",
      liftId: "LIFT-2024-003"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { class: 'badge-warning', text: 'PENDING' },
      'in-progress': { class: 'badge-info', text: 'IN PROGRESS' },
      'completed': { class: 'badge-success', text: 'COMPLETED' },
      'overdue': { class: 'badge-danger', text: 'OVERDUE' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  const getPriorityIcon = (priority) => {
    const iconConfig = {
      'low': { icon: faCheckCircle, color: 'text-green-500' },
      'medium': { icon: faClock, color: 'text-yellow-500' },
      'high': { icon: faExclamationTriangle, color: 'text-red-500' }
    };
    
    const config = iconConfig[priority] || iconConfig.medium;
    return <FontAwesomeIcon icon={config.icon} className={`text-sm ${config.color}`} />;
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.liftId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || task.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 mb-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-card rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-white text-sm" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white">Tasks</h1>
          <p className="text-text-secondary text-xs">Manage your assigned tasks</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="px-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary text-sm" 
          />
          <input
            type="text"
            placeholder="Search tasks, sites, or lift IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-card border-none rounded-lg text-white placeholder-text-secondary text-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-accent text-white'
                  : 'bg-card text-text-secondary'
              }`}
            >
              {status === 'all' ? 'All' : status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-4 mt-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faSearch} className="text-text-secondary text-2xl mb-3" />
            <p className="text-text-secondary">No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-card rounded-lg p-4 space-y-3 cursor-pointer"
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm flex-1">{task.title}</h3>
                    {getPriorityIcon(task.priority)}
                  </div>
                  <p className="text-text-secondary text-xs mb-2">{task.site}</p>
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />
                      <span className="truncate">{task.address}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendar} className="w-3" />
                      <span>{task.dueDate}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(task.status)}
                  <span className="text-xs text-text-secondary">{task.liftId}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border-color">
                <span className="text-xs text-text-secondary">Assigned to: {task.assignedTo}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTaskClick(task.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-accent text-white rounded text-xs font-medium"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-xs" />
                  {task.status === 'completed' ? 'View' : 'Start'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksScreen;