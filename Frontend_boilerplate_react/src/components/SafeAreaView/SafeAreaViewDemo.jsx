import React, { useState } from 'react';
import SafeAreaView from './SafeAreaView';
import SafeAreaViewFlexible from './SafeAreaViewFlexible';

/**
 * Demo component to showcase SafeAreaView functionality
 * Shows visual indicators of safe areas and demonstrates responsive behavior
 */
const SafeAreaViewDemo = () => {
  const [useFixed, setUseFixed] = useState(true);
  const [excludeBottom, setExcludeBottom] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const demoContent = (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>
          SafeAreaView Demo
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.8 }}>
          This component respects browser safe areas using CSS env() variables
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
          Safe Area Information
        </h2>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p><strong>Top Safe Area:</strong> <code>env(safe-area-inset-top)</code></p>
          <p><strong>Right Safe Area:</strong> <code>env(safe-area-inset-right)</code></p>
          <p><strong>Bottom Safe Area:</strong> <code>env(safe-area-inset-bottom)</code></p>
          <p><strong>Left Safe Area:</strong> <code>env(safe-area-inset-left)</code></p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#ff3b3b', 
        padding: '15px', 
        borderRadius: '8px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontWeight: '600' }}>
          Content is automatically padded to avoid notches, status bars, and home indicators
        </p>
        {excludeBottom && (
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
            Bottom padding excluded (useful when you have a bottom navigation)
          </p>
        )}
        {fullScreen && (
          <p style={{ margin: '10px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
            Full-screen mode - no padding, content goes edge-to-edge
          </p>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#333', 
        padding: '20px', 
        borderRadius: '12px',
        marginBottom: '20px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
          How it works:
        </h3>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
          <li>Uses CSS <code>env()</code> variables for safe area insets</li>
          <li>Works on iOS Safari, Android Chrome, and other modern browsers</li>
          <li>Gracefully degrades on desktop (env() returns 0)</li>
          <li>Supports custom styles while maintaining safe area padding</li>
          <li>Mobile-first design with full viewport height</li>
          <li><strong>excludeBottom prop</strong> prevents double padding with bottom navigation</li>
          <li><strong>fullScreen prop</strong> removes all padding for edge-to-edge content</li>
        </ul>
      </div>

      {/* Add lots of content to test scrolling */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ 
          backgroundColor: '#444', 
          padding: '20px', 
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>
            Scroll Test Section {i + 1}
          </h4>
          <p style={{ fontSize: '14px', opacity: 0.8 }}>
            This content should never scroll over the status bar or notification area. 
            Try scrolling up and down to see how the SafeAreaView prevents content 
            from going into unsafe areas.
          </p>
        </div>
      ))}

      {/* Visual indicators of safe areas - only show when not in fullScreen mode */}
      {!fullScreen && (
        <>
          <div style={{ 
            position: 'fixed', 
            top: 'env(safe-area-inset-top, 0px)', 
            left: 'env(safe-area-inset-left, 0px)',
            right: 'env(safe-area-inset-right, 0px)',
            height: '2px',
            backgroundColor: '#ff3b3b',
            zIndex: 1000
          }} />
          
          {!excludeBottom && (
            <div style={{ 
              position: 'fixed', 
              bottom: 'env(safe-area-inset-bottom, 0px)', 
              left: 'env(safe-area-inset-left, 0px)',
              right: 'env(safe-area-inset-right, 0px)',
              height: '2px',
              backgroundColor: '#ff3b3b',
              zIndex: 1000
            }} />
          )}
          
          <div style={{ 
            position: 'fixed', 
            top: 'env(safe-area-inset-top, 0px)', 
            left: 'env(safe-area-inset-left, 0px)',
            width: '2px',
            bottom: excludeBottom ? '0px' : 'env(safe-area-inset-bottom, 0px)',
            backgroundColor: '#ff3b3b',
            zIndex: 1000
          }} />
          
          <div style={{ 
            position: 'fixed', 
            top: 'env(safe-area-inset-top, 0px)', 
            right: 'env(safe-area-inset-right, 0px)',
            width: '2px',
            bottom: excludeBottom ? '0px' : 'env(safe-area-inset-bottom, 0px)',
            backgroundColor: '#ff3b3b',
            zIndex: 1000
          }} />
        </>
      )}
    </>
  );

  return (
    <>
      {/* Toggle buttons */}
      <div style={{
        position: 'fixed',
        top: fullScreen ? '10px' : 'env(safe-area-inset-top, 0px)',
        right: fullScreen ? '10px' : 'env(safe-area-inset-right, 0px)',
        zIndex: 2000,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          onClick={() => setUseFixed(!useFixed)}
          style={{
            backgroundColor: '#ff3b3b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {useFixed ? 'Switch to Flexible' : 'Switch to Fixed'}
        </button>
        
        <button
          onClick={() => setExcludeBottom(!excludeBottom)}
          style={{
            backgroundColor: excludeBottom ? '#10b981' : '#ff3b3b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {excludeBottom ? 'Include Bottom' : 'Exclude Bottom'}
        </button>

        <button
          onClick={() => setFullScreen(!fullScreen)}
          style={{
            backgroundColor: fullScreen ? '#10b981' : '#ff3b3b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          {fullScreen ? 'Normal Mode' : 'Full Screen'}
        </button>
      </div>

      {useFixed ? (
        <SafeAreaView
          excludeBottom={excludeBottom}
          fullScreen={fullScreen}
          style={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '20px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {demoContent}
        </SafeAreaView>
      ) : (
        <SafeAreaViewFlexible
          excludeBottom={excludeBottom}
          fullScreen={fullScreen}
          style={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '20px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {demoContent}
        </SafeAreaViewFlexible>
      )}
    </>
  );
};

export default SafeAreaViewDemo; 