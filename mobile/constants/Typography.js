// GridPulse Mobile Commander — Typography System
import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const Typography = {
  hero: {
    fontSize: 34,
    fontWeight: '800',
    fontFamily,
    letterSpacing: -0.5,
  },
  headline: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily,
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily,
    letterSpacing: 0,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily,
    letterSpacing: 0.1,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily,
    letterSpacing: 0.1,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily,
    letterSpacing: 0.2,
  },
  captionBold: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily,
    letterSpacing: 0.2,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  metric: {
    fontSize: 36,
    fontWeight: '800',
    fontFamily,
    letterSpacing: -1,
  },
  metricSmall: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily,
    letterSpacing: -0.5,
  },
};
