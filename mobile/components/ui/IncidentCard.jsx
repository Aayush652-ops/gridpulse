import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, getSeverityColor, getPriorityColor } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Layout } from '../../constants/Layout';
import { formatCause, formatDateTime } from '../../utils/formatters';
import { Badge } from './Badge';

export function IncidentCard({ incident, onPress }) {
  const {
    id,
    event_cause,
    priority,
    severity_score,
    address,
    start_datetime,
    status,
    police_station,
  } = incident;

  const causeStr = formatCause(event_cause);
  const severityColor = getSeverityColor(severity_score);
  const priorityColor = getPriorityColor(priority);

  let iconName = 'alert-circle';
  if (event_cause === 'accident') iconName = 'car';
  else if (event_cause === 'water_logging') iconName = 'water';
  else if (event_cause === 'construction') iconName = 'construct';
  else if (event_cause === 'vehicle_breakdown') iconName = 'warning';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.causeRow}>
          <View style={[styles.iconBox, { backgroundColor: `${severityColor}20` }]}>
            <Ionicons name={iconName} size={20} color={severityColor} />
          </View>
          <View>
            <Text style={styles.causeText}>{causeStr}</Text>
            <Text style={styles.idText}>ID: {id}</Text>
          </View>
        </View>
        <Badge text={`${severity_score}%`} color={severityColor} />
      </View>

      <View style={styles.body}>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText} numberOfLines={2}>{address || 'Unknown Location'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{police_station} Jurisdiction</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time" size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{formatDateTime(start_datetime)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerTags}>
          <View style={styles.tag}>
            <View style={[styles.dot, { backgroundColor: priorityColor }]} />
            <Text style={styles.tagText}>{priority} Priority</Text>
          </View>
          <View style={styles.tag}>
            <View style={[styles.dot, { backgroundColor: status === 'active' ? Colors.danger : Colors.success }]} />
            <Text style={styles.tagText}>{status?.toUpperCase() || 'UNKNOWN'}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  causeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  causeText: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
  },
  idText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
  },
  body: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  infoText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  footerTags: {
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  tagText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
  }
});
