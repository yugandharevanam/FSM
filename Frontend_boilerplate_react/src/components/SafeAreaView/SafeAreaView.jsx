import React, { useEffect } from 'react';

/**
 * SafeAreaView component for React Web
 * Mimics React Native's SafeAreaView behavior using CSS env() variables
 * Respects browser safe areas, especially on mobile devices with notches
 * Prevents content from scrolling over status bars and notifications
 */
const SafeAreaView = ({ 
  children, 
  style = {}, 
  className = '',
  excludeBottom = false, // New prop to exclude bottom padding
  fullScreen = false, // New prop for full-screen mode
  ...props 
}) => {
  // Manage body scrolling when SafeAreaView is mounted
  useEffect(() => {
    // Add class to body to prevent native scrolling
    document.body.classList.add('safe-area-active');
    
    // Cleanup function to restore body scrolling
    return () => {
      document.body.classList.remove('safe-area-active');
    };
  }, []);

  const wrapperStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: fullScreen ? '0px' : 'env(safe-area-inset-top, 0px)',
    paddingRight: fullScreen ? '0px' : 'env(safe-area-inset-right, 0px)',
    paddingBottom: fullScreen ? '0px' : (excludeBottom ? '0px' : 'calc(env(safe-area-inset-bottom, 0px) * 0.2)'),
    paddingLeft: fullScreen ? '0px' : 'env(safe-area-inset-left, 0px)',
    boxSizing: 'border-box',
    zIndex: 1,
  };

  const contentStyles = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    overscrollBehavior: 'contain',
    ...style
  };

  return (
    <div 
      className={`safe-area-wrapper ${className}`}
      style={wrapperStyles}
      {...props}
    >
      <div 
        className="safe-area-content"
        style={contentStyles}
      >
        {children}
      </div>
    </div>
  );
};

export default SafeAreaView; 