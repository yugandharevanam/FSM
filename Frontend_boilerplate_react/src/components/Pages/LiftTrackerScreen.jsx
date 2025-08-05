import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faSearch,
  faQrcode,
  faCamera,
  faCheckCircle,
  faClock,
  faMapMarkerAlt,
  faTruck,
  faBuilding,
  faHandshake,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const LiftTrackerScreen = ({ user }) => {
  const navigate = useNavigate();
  const [liftId, setLiftId] = useState('');
  const [liftData, setLiftData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock lift journey data
  const mockLiftJourney = {
    liftId: "LIFT-2024-001",
    model: "Passenger Lift XL-2000",
    capacity: "1000kg",
    floors: "8 floors",
    journey: [
      {
        id: 1,
        stage: "Factory",
        status: "completed",
        timestamp: "2024-01-15 10:30 AM",
        location: "Manufacturing Plant, Industrial Zone",
        description: "Lift manufactured and quality tested",
        icon: faBuilding
      },
      {
        id: 2,
        stage: "Dispatched",
        status: "completed",
        timestamp: "2024-01-18 02:15 PM",
        location: "Warehouse, Logistics Center",
        description: "Lift packaged and dispatched to site",
        icon: faTruck
      },
      {
        id: 3,
        stage: "Delivered",
        status: "completed",
        timestamp: "2024-01-20 09:45 AM",
        location: "Tech Park Tower, Downtown",
        description: "Lift delivered to installation site",
        icon: faMapMarkerAlt
      },
      {
        id: 4,
        stage: "Installed",
        status: "in-progress",
        timestamp: "2024-01-22 11:20 AM",
        location: "Tech Park Tower, Downtown",
        description: "Installation in progress by technician team",
        icon: faBuilding
      },
      {
        id: 5,
        stage: "Handover",
        status: "pending",
        timestamp: null,
        location: "Tech Park Tower, Downtown",
        description: "Final inspection and customer handover",
        icon: faHandshake
      }
    ]
  };

  const handleSearch = () => {
    if (liftId.trim()) {
      // Mock search - in real app, fetch from API
      setLiftData(mockLiftJourney);
    } else {
      alert('Please enter a Lift ID');
    }
  };

  const handleScanQR = () => {
    setIsScanning(true);
    // Mock QR scan - in real app, open camera
    setTimeout(() => {
      setIsScanning(false);
      setLiftId('LIFT-2024-001');
      setLiftData(mockLiftJourney);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'in-progress':
        return <FontAwesomeIcon icon={faClock} className="text-accent" />;
      case 'pending':
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-text-secondary" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="text-text-secondary" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-accent';
      case 'pending':
        return 'border-border-color';
      default:
        return 'border-border-color';
    }
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
          <h1 className="text-lg font-bold text-white">Lift Tracker</h1>
          <p className="text-text-secondary text-xs">Track lift journey and status</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h2 className="text-white font-semibold text-sm mb-4">Search Lift</h2>
          
          <div className="space-y-4">
            {/* Manual Input */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faSearch} className="text-text-secondary" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Lift ID (e.g., LIFT-2024-001)"
                  value={liftId}
                  onChange={(e) => setLiftId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bg-input border border-border-color rounded-lg focus:border-accent transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faSearch} />
                Search
              </button>
            </div>

            {/* QR Scanner */}
            <div className="text-center">
              <div className="text-text-secondary text-xs mb-2">or</div>
              <button
                onClick={handleScanQR}
                disabled={isScanning}
                className="w-full py-3 px-4 bg-bg-input text-white rounded-lg font-semibold hover:bg-border-color transition-colors border border-border-color flex items-center justify-center gap-2"
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faQrcode} />
                    Scan QR Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lift Details */}
      {liftData && (
        <div className="space-y-4">
          {/* Lift Info Card */}
          <div className="px-4">
            <div className="bg-card rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm flex-1">{liftData.liftId}</h3>
                  </div>
                  <p className="text-text-secondary text-xs mb-2">{liftData.model}</p>
                  <div className="flex flex-col gap-1 text-xs text-text-secondary">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faBuilding} className="w-3" />
                      <span>Capacity: {liftData.capacity}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3" />
                      <span>{liftData.floors}</span>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="badge badge-info">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="px-4">
            <div className="bg-card rounded-lg p-4">
              <h3 className="text-white font-semibold text-sm mb-4">Journey Timeline</h3>
              
              <div className="space-y-6">
                {liftData.journey.map((stage, index) => (
                  <div key={stage.id} className="relative">
                    {/* Timeline Line */}
                    {index < liftData.journey.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-border-color" />
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Status Circle */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(stage.status)}`}>
                        {getStatusIcon(stage.status)}
                      </div>
                      
                      {/* Stage Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={stage.icon} className="text-accent" />
                          <h4 className="text-white font-semibold text-sm">{stage.stage}</h4>
                          {stage.status === 'in-progress' && (
                            <span className="badge badge-warning">Current</span>
                          )}
                        </div>
                        
                        {stage.timestamp && (
                          <p className="text-text-secondary text-xs mb-1">
                            {stage.timestamp}
                          </p>
                        )}
                        
                        <p className="text-text-secondary text-xs mb-2">
                          {stage.location}
                        </p>
                        
                        <p className="text-white text-xs">
                          {stage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Status Summary */}
          <div className="px-4">
            <div className="bg-card rounded-lg p-4">
              <h3 className="text-white font-semibold text-sm mb-3">Current Status</h3>
              <div className="bg-bg-input rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FontAwesomeIcon icon={faClock} className="text-accent" />
                  <span className="text-white font-medium text-sm">Installation in Progress</span>
                </div>
                <p className="text-text-secondary text-xs">
                  The lift is currently being installed at Tech Park Tower. 
                  Expected completion: 2-3 days
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 space-y-3">
            <button
              onClick={() => navigate(`/task/TASK001`)}
              className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faBuilding} />
              View Installation Task
            </button>
            
            <button
              onClick={() => navigate('/report-issue')}
              className="w-full bg-bg-input text-accent py-3 px-4 rounded-lg font-semibold hover:bg-border-color transition-colors border border-border-color flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} />
              Report Installation Issue
            </button>
          </div>
        </div>
      )}

      {/* No Data State */}
      {!liftData && (
        <div className="px-4">
          <div className="bg-card rounded-lg p-4 text-center py-12">
            <FontAwesomeIcon icon={faSearch} className="text-text-secondary text-4xl mb-4" />
            <h3 className="text-white font-semibold text-sm mb-2">Search for a Lift</h3>
            <p className="text-text-secondary text-xs">
              Enter a Lift ID or scan a QR code to track its journey
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiftTrackerScreen; 