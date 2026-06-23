// GridPulse Mobile Commander — Layout Constants
import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Layout = {
  window: { width, height },
  isSmallDevice: width < 375,
  isLargeDevice: width >= 428,

  // Spacing scale (4px base)
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 48,
  },

  // Border radius
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 9999,
  },

  // Padding presets
  padding: {
    screen: 16,
    card: 16,
    section: 20,
  },

  // Safe area
  statusBarHeight: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0,

  // Tab bar
  tabBarHeight: Platform.OS === 'ios' ? 85 : 65,

  // Card sizes
  cardHeight: {
    small: 80,
    medium: 120,
    large: 180,
  },

  // Map defaults
  map: {
    defaultLatitude: 12.9716,
    defaultLongitude: 77.5946,
    defaultLatitudeDelta: 0.15,
    defaultLongitudeDelta: 0.15,
  },
};
