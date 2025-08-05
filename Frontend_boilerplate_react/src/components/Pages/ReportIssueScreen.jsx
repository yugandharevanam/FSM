import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft,
  faCamera,
  faImage,
  faExclamationTriangle,
  faWrench,
  faClock,
  faShieldAlt,
  faPaperPlane,
  faMapMarkerAlt,
  faUser,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

const ReportIssueScreen = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    issueType: '',
    priority: 'medium',
    title: '',
    description: '',
    location: '',
    liftId: '',
    photos: [],
    contactInfo: {
      name: user.name,
      phone: '+1 (555) 987-6543',
      email: 'john.smith@eliteconstruct.com'
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueTypes = [
    {
      id: 'civil',
      name: 'Civil',
      icon: faWrench,
      description: 'Structural, foundation, or construction issues',
      color: 'text-blue-500'
    },
    {
      id: 'electrical',
      name: 'Electrical',
      icon: faExclamationTriangle,
      description: 'Power, wiring, or electrical system problems',
      color: 'text-yellow-500'
    },
    {
      id: 'delay',
      name: 'Delay',
      icon: faClock,
      description: 'Schedule delays or timeline issues',
      color: 'text-orange-500'
    },
    {
      id: 'safety',
      name: 'Safety',
      icon: faShieldAlt,
      description: 'Safety concerns or violations',
      color: 'text-red-500'
    }
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: 'text-green-500' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-500' },
    { id: 'high', name: 'High', color: 'text-orange-500' },
    { id: 'critical', name: 'Critical', color: 'text-red-500' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = () => {
    // Mock photo upload
    alert('Photo upload functionality would open camera/gallery');
    const mockPhoto = {
      id: Date.now(),
      name: `photo_${Date.now()}.jpg`,
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvPC90ZXh0Pgo8L3N2Zz4K'
    };
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, mockPhoto]
    }));
  };

  const handleRemovePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.issueType || !formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Issue reported successfully! Our team will contact you soon.');
      navigate(-1);
    }, 2000);
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
          <h1 className="text-lg font-bold text-white">Report Issue</h1>
          <p className="text-text-secondary text-xs">Report on-site problems or concerns</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Issue Type Selection */}
        <div className="px-4">
          <div className="bg-card rounded-lg p-4">
            <h2 className="text-white font-semibold text-sm mb-4">Issue Type *</h2>
            <div className="grid grid-cols-2 gap-3">
              {issueTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleInputChange('issueType', type.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.issueType === type.id
                      ? 'border-accent bg-bg-input'
                      : 'border-border-color bg-bg-input hover:border-accent'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FontAwesomeIcon icon={type.icon} className={`text-lg ${type.color}`} />
                    <span className="text-white font-medium text-sm">{type.name}</span>
                  </div>
                  <p className="text-text-secondary text-xs">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Selection */}
        <div className="px-4">
          <div className="bg-card rounded-lg p-4">
            <h2 className="text-white font-semibold text-sm mb-4">Priority Level</h2>
            <div className="flex gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  type="button"
                  onClick={() => handleInputChange('priority', priority.id)}
                  className={`flex-1 py-3 px-3 rounded-lg text-xs font-medium transition-colors ${
                    formData.priority === priority.id
                      ? 'bg-accent text-white'
                      : 'bg-bg-input text-text-secondary hover:text-white border border-border-color'
                  }`}
                >
                  {priority.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Issue Details */}
        <div className="px-4">
          <div className="bg-card rounded-lg p-4">
            <h2 className="text-white font-semibold text-sm mb-4">Issue Details</h2>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-sm">Title *</label>
                <input
                  type="text"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label text-sm">Description *</label>
                <textarea
                  placeholder="Detailed description of the issue, what happened, and any relevant context..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="form-input resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label text-sm">Location</label>
                  <input
                    type="text"
                    placeholder="Site location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label text-sm">Lift ID</label>
                  <input
                    type="text"
                    placeholder="LIFT-2024-001"
                    value={formData.liftId}
                    onChange={(e) => handleInputChange('liftId', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="px-4">
          <div className="bg-card rounded-lg p-4">
            <h2 className="text-white font-semibold text-sm mb-4">Photos (Optional)</h2>
            
            <div className="space-y-4">
              <button
                type="button"
                onClick={handlePhotoUpload}
                className="w-full py-4 px-4 bg-bg-input border-2 border-dashed border-border-color rounded-lg hover:border-accent transition-colors flex flex-col items-center justify-center gap-3"
              >
                <FontAwesomeIcon icon={faCamera} className="text-accent text-2xl" />
                <span className="text-white font-medium text-sm">Add Photos</span>
                <span className="text-text-secondary text-xs text-center">Tap to capture or select from gallery</span>
              </button>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {formData.photos.map((photo) => (
                    <div key={photo.id} className="relative">
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="px-4">
          <div className="bg-card rounded-lg p-4">
            <h2 className="text-white font-semibold text-sm mb-4 flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} className="text-accent" />
              Contact Information
            </h2>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label text-sm">Name</label>
                <input
                  type="text"
                  value={formData.contactInfo.name}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label text-sm">Phone</label>
                  <input
                    type="tel"
                    value={formData.contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label text-sm">Email</label>
                  <input
                    type="email"
                    value={formData.contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>Submit Issue Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIssueScreen; 