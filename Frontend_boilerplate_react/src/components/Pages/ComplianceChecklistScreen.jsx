import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faCheckCircle,
  faTimes,
  faCamera,
  faEdit,
  faSignature,
  faUser,
  faBuilding,
  faClipboardCheck,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";

const ComplianceChecklistScreen = ({ user }) => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('civil');
  const [checklistData, setChecklistData] = useState({
    civil: [
      { id: 1, item: "Foundation inspection completed", status: 'ok', photo: null, remarks: '' },
      { id: 2, item: "Structural integrity verified", status: 'ok', photo: null, remarks: '' },
      { id: 3, item: "Pit dimensions meet specifications", status: 'not-ok', photo: null, remarks: 'Pit needs adjustment' },
      { id: 4, item: "Hoistway clearance confirmed", status: 'pending', photo: null, remarks: '' }
    ],
    electrical: [
      { id: 1, item: "Power supply voltage checked", status: 'ok', photo: null, remarks: '' },
      { id: 2, item: "Emergency backup system tested", status: 'ok', photo: null, remarks: '' },
      { id: 3, item: "Wiring installation verified", status: 'pending', photo: null, remarks: '' },
      { id: 4, item: "Safety switches functional", status: 'pending', photo: null, remarks: '' }
    ],
    safety: [
      { id: 1, item: "Fire safety compliance", status: 'ok', photo: null, remarks: '' },
      { id: 2, item: "Emergency lighting installed", status: 'pending', photo: null, remarks: '' },
      { id: 3, item: "Safety signage in place", status: 'pending', photo: null, remarks: '' },
      { id: 4, item: "Accessibility standards met", status: 'pending', photo: null, remarks: '' }
    ]
  });

  const [signatures, setSignatures] = useState({
    technician: null,
    customer: null
  });

  const tabs = [
    { id: 'civil', name: 'Civil', icon: faBuilding },
    { id: 'electrical', name: 'Electrical', icon: faClipboardCheck },
    { id: 'safety', name: 'Safety', icon: faExclamationTriangle }
  ];

  const handleStatusChange = (category, itemId, status) => {
    setChecklistData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === itemId ? { ...item, status } : item
      )
    }));
  };

  const handlePhotoUpload = (category, itemId) => {
    // Mock photo upload
    alert('Photo upload functionality would open camera/gallery');
  };

  const handleAddRemarks = (category, itemId) => {
    const remarks = prompt('Add remarks:');
    if (remarks !== null) {
      setChecklistData(prev => ({
        ...prev,
        [category]: prev[category].map(item => 
          item.id === itemId ? { ...item, remarks } : item
        )
      }));
    }
  };

  const handleSignatureCapture = (type) => {
    // Mock signature capture
    alert(`${type} signature capture would open signature pad`);
    setSignatures(prev => ({
      ...prev,
      [type]: 'captured'
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ok':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case 'not-ok':
        return <FontAwesomeIcon icon={faTimes} className="text-red-500" />;
      default:
        return <div className="w-4 h-4 border-2 border-text-secondary rounded-full" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ok':
        return 'OK';
      case 'not-ok':
        return 'Not OK';
      default:
        return 'Pending';
    }
  };

  const getCompletionStatus = () => {
    const allItems = [...checklistData.civil, ...checklistData.electrical, ...checklistData.safety];
    const completed = allItems.filter(item => item.status !== 'pending').length;
    const total = allItems.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const completionStatus = getCompletionStatus();

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
          <h1 className="text-lg font-bold text-white">Compliance Checklist</h1>
          <p className="text-text-secondary text-xs">LIFT-2024-001</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-sm">Overall Progress</h3>
            <span className="text-accent font-bold text-sm">{completionStatus.percentage}%</span>
          </div>
          <div className="w-full bg-bg-input rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionStatus.percentage}%` }}
            />
          </div>
          <p className="text-text-secondary text-xs mt-2">
            {completionStatus.completed} of {completionStatus.total} items completed
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <div className="flex space-x-1 mb-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 py-2 px-3 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 min-w-[80px] ${
                  activeTab === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-bg-input text-text-secondary hover:text-white'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} className="text-xs" />
                <span className="truncate">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Checklist Items */}
          <div className="space-y-3">
            {checklistData[activeTab].map((item) => (
              <div key={item.id} className="border border-border-color rounded-lg p-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-sm mb-1 break-words">{item.item}</h4>
                    {item.remarks && (
                      <p className="text-text-secondary text-xs italic break-words">"{item.remarks}"</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                    {getStatusIcon(item.status)}
                    <span className="text-xs text-text-secondary whitespace-nowrap">{getStatusText(item.status)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    onClick={() => handleStatusChange(activeTab, item.id, 'ok')}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      item.status === 'ok'
                        ? 'bg-green-600 text-white'
                        : 'bg-bg-input text-text-secondary hover:text-white'
                    }`}
                  >
                    OK
                  </button>
                  <button
                    onClick={() => handleStatusChange(activeTab, item.id, 'not-ok')}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      item.status === 'not-ok'
                        ? 'bg-red-600 text-white'
                        : 'bg-bg-input text-text-secondary hover:text-white'
                    }`}
                  >
                    Not OK
                  </button>
                  <button
                    onClick={() => handlePhotoUpload(activeTab, item.id)}
                    className="p-1.5 bg-bg-input rounded hover:bg-border-color transition-colors"
                  >
                    <FontAwesomeIcon icon={faCamera} className="text-accent text-xs" />
                  </button>
                  <button
                    onClick={() => handleAddRemarks(activeTab, item.id)}
                    className="p-1.5 bg-bg-input rounded hover:bg-border-color transition-colors"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-accent text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div className="px-4 mb-4">
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faSignature} className="text-accent" />
            Signatures Required
          </h3>
          
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-border-color rounded-lg gap-3">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-accent flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">Technician Signature</p>
                  <p className="text-text-secondary text-xs truncate">{user.name}</p>
                </div>
              </div>
              <button
                onClick={() => handleSignatureCapture('technician')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  signatures.technician
                    ? 'bg-green-600 text-white'
                    : 'bg-accent text-white hover:bg-red-600'
                }`}
              >
                {signatures.technician ? 'Signed' : 'Sign'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-border-color rounded-lg gap-3">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-accent flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">Customer Signature</p>
                  <p className="text-text-secondary text-xs truncate">Site Contact</p>
                </div>
              </div>
              <button
                onClick={() => handleSignatureCapture('customer')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  signatures.customer
                    ? 'bg-green-600 text-white'
                    : 'bg-accent text-white hover:bg-red-600'
                }`}
              >
                {signatures.customer ? 'Signed' : 'Sign'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4">
        <button
          onClick={() => {
            alert('Compliance checklist submitted successfully!');
            navigate(-1);
          }}
          className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Submit Compliance Report
        </button>
      </div>
    </div>
  );
};

export default ComplianceChecklistScreen; 