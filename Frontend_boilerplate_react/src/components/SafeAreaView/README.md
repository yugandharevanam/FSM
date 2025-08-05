# SafeAreaView Component

A React component that mimics React Native's SafeAreaView behavior for web browsers. This component automatically applies padding to respect browser safe areas, especially on mobile devices with notches, status bars, or home indicators.

## Features

- ✅ Uses CSS `env()` variables for safe area insets
- ✅ Works on iOS Safari, Android Chrome, and other modern browsers
- ✅ Gracefully degrades on desktop browsers (env() returns 0)
- ✅ Supports custom styles while maintaining safe area padding
- ✅ Mobile-first design with full viewport height
- ✅ **Prevents content from scrolling over status bars and notifications**
- ✅ Two implementation approaches: Fixed and Flexible
- ✅ TypeScript-friendly props interface

## Usage

### Basic Usage

```jsx
import SafeAreaView from './components/SafeAreaView';

function App() {
  return (
    <SafeAreaView>
      <h1>Your content here</h1>
    </SafeAreaView>
  );
}
```

### With Custom Styles

```jsx
import SafeAreaView from './components/SafeAreaView';

function App() {
  return (
    <SafeAreaView 
      style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        padding: '20px'
      }}
    >
      <h1>Your content here</h1>
    </SafeAreaView>
  );
}
```

### With Custom Class Name

```jsx
import SafeAreaView from './components/SafeAreaView';

function App() {
  return (
    <SafeAreaView className="my-custom-class">
      <h1>Your content here</h1>
    </SafeAreaView>
  );
}
```

### With Bottom Navigation

```jsx
import SafeAreaView from './components/SafeAreaView';

function App() {
  return (
    <SafeAreaView excludeBottom={true}>
      <h1>Your content here</h1>
      {/* Your bottom navigation will handle its own safe area */}
    </SafeAreaView>
  );
}
```

### Full-Screen Mode

```jsx
import SafeAreaView from './components/SafeAreaView';

function App() {
  return (
    <SafeAreaView fullScreen={true}>
      <h1>Your content here</h1>
      {/* Content goes edge-to-edge with no padding */}
    </SafeAreaView>
  );
}
```

### Flexible Alternative

```jsx
import SafeAreaViewFlexible from './components/SafeAreaView/SafeAreaViewFlexible';

function App() {
  return (
    <SafeAreaViewFlexible className="my-custom-class">
      <h1>Your content here</h1>
    </SafeAreaViewFlexible>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to render inside the safe area |
| `style` | CSSProperties | `{}` | Custom styles (safe area padding will be applied on top) |
| `className` | string | `''` | Custom CSS class name |
| `excludeBottom` | boolean | `false` | Exclude bottom padding (useful when you have a bottom navigation) |
| `fullScreen` | boolean | `false` | Full-screen mode with no padding (edge-to-edge content) |
| `...props` | any | - | All other props are spread to the underlying div element |

## How It Works

### CSS Environment Variables

The component uses CSS `env()` variables to automatically detect and respect safe areas:

- `env(safe-area-inset-top)` - Top safe area (status bar, notch)
- `env(safe-area-inset-right)` - Right safe area
- `env(safe-area-inset-bottom)` - Bottom safe area (home indicator, navigation bar)
- `env(safe-area-inset-left)` - Left safe area

### Scrolling Prevention

The component prevents content from scrolling over status bars and notifications through:

1. **Fixed Approach**: Uses `position: fixed` with controlled scrolling container
2. **Flexible Approach**: Uses padding with natural document flow
3. **Body Scroll Management**: Prevents native body scrolling when needed
4. **Overscroll Behavior**: Prevents pull-to-refresh and bounce effects
5. **Bottom Navigation Support**: `excludeBottom` prop prevents double padding with bottom navigation

### Browser Support

- **iOS Safari**: Full support for safe areas
- **Android Chrome**: Full support for safe areas
- **Desktop browsers**: Gracefully degrades (env() returns 0)
- **Older browsers**: Falls back to 0px padding

### Required HTML Meta Tag

Ensure your HTML includes the proper viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

The `viewport-fit=cover` property is essential for safe area support.

## Implementation Details

### Core Styles Applied

#### Fixed Approach (Default)
```css
.safe-area-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: env(safe-area-inset-top, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  z-index: 1;
}

.safe-area-content {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
```

#### Flexible Approach
```css
.safe-area-flexible {
  min-height: 100vh;
  width: 100%;
  padding-top: env(safe-area-inset-top, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  box-sizing: border-box;
  position: relative;
}
```

### Why This Approach is Safe for Web

1. **Progressive Enhancement**: The component works on all browsers, with enhanced functionality on supported ones
2. **No JavaScript Dependencies**: Uses pure CSS, making it fast and reliable
3. **Standard Web APIs**: Uses official CSS environment variables, not proprietary solutions
4. **Future-Proof**: Follows web standards that are actively maintained
5. **Performance**: No runtime calculations or DOM queries needed
6. **Scroll Safety**: Prevents content from going over status bars and notifications
7. **Mobile Optimized**: Handles touch scrolling and overscroll behavior properly

### Mobile-Specific Considerations

- **Touch Scrolling**: Includes `-webkit-overflow-scrolling: touch` for smooth scrolling on iOS
- **Viewport Height**: Uses `100vh` for full viewport height
- **Overflow Handling**: Prevents horizontal overflow with `overflow-x: hidden`
- **Overscroll Prevention**: Uses `overscroll-behavior: contain` to prevent pull-to-refresh
- **Body Scroll Management**: Prevents native body scrolling when using fixed approach
- **Status Bar Protection**: Ensures content never scrolls over status bars or notifications

## Demo

See `SafeAreaViewDemo.jsx` for a complete example with visual indicators of safe areas.

## Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| iOS Safari | 11.0+ | ✅ Full |
| Android Chrome | 69+ | ✅ Full |
| Chrome Desktop | 69+ | ✅ Degraded |
| Firefox | 65+ | ✅ Degraded |
| Safari Desktop | 11.1+ | ✅ Degraded |
| Edge | 79+ | ✅ Degraded |

*Degraded support means the component works but safe area values are 0 on desktop* 