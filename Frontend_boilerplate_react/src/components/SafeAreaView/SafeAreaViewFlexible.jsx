import React from 'react';

/**
 * Flexible SafeAreaView component for React Web
 * Alternative approach that doesn't use fixed positioning
 * Still prevents content from scrolling over status bars
 */
const SafeAreaViewFlexible = ({ 
  children, 
  style = {}, 
  className = '',
  excludeBottom = false, // New prop to exclude bottom padding
  fullScreen = false, // New prop for full-screen mode
  ...props 
}) => {
  const containerStyles = {
    minHeight: '100vh',
    width: '100%',
    paddingTop: fullScreen ? '0px' : 'env(safe-area-inset-top, 0px)',
    paddingRight: fullScreen ? '0px' : 'env(safe-area-inset-right, 0px)',
    paddingBottom: fullScreen ? '0px' : (excludeBottom ? '0px' : 'env(safe-area-inset-bottom, 0px)'),
    paddingLeft: fullScreen ? '0px' : 'env(safe-area-inset-left, 0px)',
    boxSizing: 'border-box',
    position: 'relative',
    ...style
  };

  return (
    <div 
      className={`safe-area-flexible ${className}`}
      style={containerStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export default SafeAreaViewFlexible; 