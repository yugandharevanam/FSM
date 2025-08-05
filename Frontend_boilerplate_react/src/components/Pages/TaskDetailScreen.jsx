import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMapMarkerAlt, 
  faClock, 
  faCalendarAlt,
  faArrowLeft,
  faCheckCircle,
  faLocationDot,
  faEdit,
  faCamera,
  faClipboardCheck,
  faFlag,
  faPhone,
  faEnvelope,
  faUser,
  faPlay
} from "@fortawesome/free-solid-svg-icons";

const TaskDetailScreen = ({ user }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1-5 steps

  // Mock task data
  const task = {
    id: taskId,
    liftId: "LIFT-2024-001",
    siteName: "Tech Park Tower",
    address: "123 Innovation Drive, Downtown, City",
    status: "in-progress",
    eta: "09:30 AM",
    type: "Installation",
    priority: "high",
    customer: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@techpark.com"
    },
    description: "Install new passenger lift in the main lobby. Ensure all safety protocols are followed.",
    steps: [
      { id: 1, name: "Not Started", status: "completed" },
      { id: 2, name: "Arrived", status: "completed" },
      { id: 3, name: "Started", status: "active" },
      { id: 4, name: "Compliance", status: "pending" },
      { id: 5, name: "Completed", status: "pending" }
    ]
  };

  const getStepStatus = (step) => {
    if (step.status === 'completed') return 'completed';
    if (step.status === 'active') return 'active';
    return 'pending';
  };

  const handleCheckIn = () => {
    // Mock check-in with location
    alert('Check-in successful! Location captured.');
    setCurrentStep(2);
  };

  const handleStartTask = () => {
    setCurrentStep(3);
  };

  const handleViewCompliance = () => {
    navigate(`/compliance/${taskId}`);
  };

  const handleCompleteTask = () => {
    setCurrentStep(5);
    alert('Task completed successfully!');
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
          <h1 className="text-lg font-bold text-white">Task Details</h1>
          <p className="text-text-secondary text-xs">{task.liftId}</p>
        </div>
      </div>

      {/* Task Info Card */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4 space-y-3">
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
                  <span>ETA: {task.eta}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-3" />
                  <span>{task.type}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="badge badge-warning">In Progress</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border-color">
            <span className="text-xs text-text-secondary break-words">{task.description}</span>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-3">Progress</h3>
          <div className="stepper overflow-x-auto">
            {task.steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="step flex-shrink-0">
                  <div className={`step-circle ${getStepStatus(step)}`}>
                    {step.status === 'completed' ? (
                      <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                    ) : (
                      <span className="text-xs">{step.id}</span>
                    )}
                  </div>
                  <span className="text-xs text-text-secondary whitespace-nowrap hidden sm:block">{step.name}</span>
                </div>
                {index < task.steps.length - 1 && (
                  <div className={`step-line ${step.status === 'completed' ? 'completed' : ''} flex-shrink-0`} />
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Mobile step labels */}
          <div className="mt-3 flex justify-between text-xs text-text-secondary sm:hidden">
            {task.steps.map((step) => (
              <span key={step.id} className="text-center flex-1 truncate px-1">
                {step.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4 space-y-3">
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-accent" />
            Customer Contact
          </h3>
          <div className="space-y-2">
            <div>
              <p className="text-white font-medium text-sm truncate">{task.customer.name}</p>
              <p className="text-text-secondary text-xs">Site Contact</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPhone} className="text-text-secondary w-3 flex-shrink-0" />
              <span className="text-text-secondary text-xs truncate">{task.customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-text-secondary w-3 flex-shrink-0" />
              <span className="text-text-secondary text-xs truncate">{task.customer.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 space-y-3">
        {currentStep === 1 && (
          <button
            onClick={handleCheckIn}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="truncate">Check-in (with GPS)</span>
          </button>
        )}

        {currentStep === 2 && (
          <button
            onClick={handleStartTask}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faPlay} />
            <span className="truncate">Start Task</span>
          </button>
        )}

        {currentStep >= 3 && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => alert('Add notes functionality')}
                className="bg-card rounded-lg p-4 hover:bg-border-color transition-colors flex flex-col items-center justify-center space-y-2"
              >
                <FontAwesomeIcon icon={faEdit} className="text-accent text-lg" />
                <span className="text-white font-medium text-xs text-center">Add Notes</span>
              </button>

              <button
                onClick={() => alert('Camera functionality')}
                className="bg-card rounded-lg p-4 hover:bg-border-color transition-colors flex flex-col items-center justify-center space-y-2"
              >
                <FontAwesomeIcon icon={faCamera} className="text-accent text-lg" />
                <span className="text-white font-medium text-xs text-center">Upload Photos</span>
              </button>
            </div>

            <button
              onClick={handleViewCompliance}
              className="w-full bg-bg-input text-white py-3 px-4 rounded-lg font-semibold hover:bg-border-color transition-colors border border-border-color flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faClipboardCheck} />
              <span className="truncate">View Compliance Checklist</span>
            </button>
          </>
        )}

        {currentStep >= 4 && (
          <button
            onClick={handleCompleteTask}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            <span className="truncate">Mark as Complete</span>
          </button>
        )}

        <button
          onClick={() => navigate('/report-issue')}
          className="w-full bg-bg-input text-accent py-3 px-4 rounded-lg font-semibold hover:bg-border-color transition-colors border border-border-color flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faFlag} />
          <span className="truncate">Report Issue</span>
        </button>
      </div>
    </div>
  );
};

export default TaskDetailScreen; 