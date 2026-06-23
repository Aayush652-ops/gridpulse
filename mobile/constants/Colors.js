// GridPulse Mobile Commander — Design System Colors
export const Colors = {
  // Primary palette
  primary: '#0EA5E9',
  primaryDark: '#0284C7',
  primaryLight: '#38BDF8',
  accent: '#22D3EE',
  accentDark: '#06B6D4',

  // Status colors
  success: '#10B981',
  successDark: '#059669',
  warning: '#F59E0B',
  warningDark: '#D97706',
  danger: '#EF4444',
  dangerDark: '#DC2626',
  info: '#6366F1',
  infoDark: '#4F46E5',

  // Backgrounds (dark mode)
  background: '#0F172A',
  backgroundLight: '#131C2E',
  surface: '#1E293B',
  surfaceLight: '#253449',
  surfaceElevated: '#334155',

  // Text
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0F172A',

  // Borders
  border: '#334155',
  borderLight: '#475569',

  // Gradients (for LinearGradient)
  gradientPrimary: ['#0EA5E9', '#6366F1'],
  gradientSuccess: ['#10B981', '#22D3EE'],
  gradientDanger: ['#EF4444', '#F59E0B'],
  gradientDark: ['#0F172A', '#1E293B'],
  gradientCard: ['rgba(30,41,59,0.9)', 'rgba(15,23,42,0.95)'],

  // Severity colors
  severityLow: '#10B981',
  severityMedium: '#F59E0B',
  severityHigh: '#EF4444',
  severityCritical: '#DC2626',

  // Map specific
  corridorGreen: '#22C55E',
  corridorBlue: '#3B82F6',
  congestionRed: '#EF4444',
  hotspotOrange: '#F97316',

  // Overlay
  overlay: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(0,0,0,0.3)',
  glassBg: 'rgba(30,41,59,0.85)',
  glassBorder: 'rgba(148,163,184,0.15)',
};

export const getSeverityColor = (score) => {
  if (score >= 75) return Colors.severityCritical;
  if (score >= 50) return Colors.severityHigh;
  if (score >= 25) return Colors.severityMedium;
  return Colors.severityLow;
};

export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high': return Colors.danger;
    case 'medium': return Colors.warning;
    case 'low': return Colors.success;
    default: return Colors.textSecondary;
  }
};
