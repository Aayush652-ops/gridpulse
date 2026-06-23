import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Layout } from '../../constants/Layout';
import { Config } from '../../constants/Config';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { generateVehicleFleet, getActiveVehicles } from '../../data/emergencyVehicles';
import { formatDistance, formatRelativeTime } from '../../utils/formatters';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EmergencyScreen() {
  const [vehicles, setVehicles] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFleet = () => {
    const fleet = generateVehicleFleet();
    // Sort by status: en_route -> on_scene -> returning -> idle
    fleet.sort((a, b) => {
      const rank = { en_route: 0, on_scene: 1, returning: 2, idle: 3 };
      return rank[a.status] - rank[b.status];
    });
    setVehicles(fleet);
    setActiveCount(fleet.filter(v => v.status !== 'idle').length);
  };

  useEffect(() => {
    fetchFleet();
    const interval = setInterval(fetchFleet, 10000); // Poll fleet every 10s
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFleet();
    setTimeout(() => setRefreshing(false), 500);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Response Fleet</Text>
        <Text style={styles.subtitle}>{activeCount} Active Units</Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <View style={styles.statsGrid}>
          {Config.VEHICLE_TYPES.slice(0, 4).map(type => {
            const count = vehicles.filter(v => v.type === type.key && v.status !== 'idle').length;
            return (
              <Card key={type.key} style={styles.statCard}>
                <Ionicons name={type.icon} size={24} color={type.color} style={{ marginBottom: 8 }} />
                <Text style={styles.statValue}>{count}</Text>
                <Text style={styles.statLabel}>{type.label.split(' ')[0]}</Text>
              </Card>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Fleet Status</Text>
        
        {vehicles.map(v => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </ScrollView>
    </View>
  );
}

function VehicleCard({ vehicle }) {
  const typeConfig = Config.VEHICLE_TYPES.find(t => t.key === vehicle.type) || Config.VEHICLE_TYPES[0];
  
  let statusColor = Colors.textSecondary;
  let statusText = 'Idle';
  if (vehicle.status === 'en_route') { statusColor = Colors.danger; statusText = 'En Route'; }
  else if (vehicle.status === 'on_scene') { statusColor = Colors.warning; statusText = 'On Scene'; }
  else if (vehicle.status === 'returning') { statusColor = Colors.success; statusText = 'Returning'; }

  return (
    <Card style={styles.vehicleCard}>
      <View style={styles.vHeader}>
        <View style={styles.vTitleRow}>
          <View style={[styles.vIconBox, { backgroundColor: `${typeConfig.color}20` }]}>
            <Ionicons name={typeConfig.icon} size={18} color={typeConfig.color} />
          </View>
          <View>
            <Text style={styles.callsign}>{vehicle.callsign}</Text>
            <Text style={styles.vDriver}>{vehicle.driver}</Text>
          </View>
        </View>
        <Badge text={statusText} color={statusColor} />
      </View>

      <View style={styles.vBody}>
        {vehicle.mission && (
          <View style={styles.vRow}>
            <Ionicons name="flag" size={16} color={Colors.textSecondary} />
            <Text style={styles.vText}>Mission: {vehicle.mission}</Text>
          </View>
        )}
        
        <View style={styles.vRowGroup}>
          <View style={styles.vRow}>
            <Ionicons name="speedometer" size={16} color={Colors.textSecondary} />
            <Text style={styles.vText}>{vehicle.speed} km/h</Text>
          </View>
          {vehicle.eta && (
            <View style={styles.vRow}>
              <Ionicons name="time" size={16} color={Colors.textSecondary} />
              <Text style={styles.vText}>ETA: {vehicle.eta}m</Text>
            </View>
          )}
          <View style={styles.vRow}>
            <Ionicons name="battery-half" size={16} color={Colors.textSecondary} />
            <Text style={styles.vText}>{vehicle.fuelLevel}% Fuel</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenHeader: {
    paddingTop: Layout.statusBarHeight + 20,
    paddingHorizontal: Layout.padding.screen,
    paddingBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  screenTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.primary,
    marginTop: 4,
  },
  scrollContent: {
    padding: Layout.padding.screen,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '23%',
    padding: 12,
    alignItems: 'center',
    marginBottom: 0,
  },
  statValue: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  statLabel: {
    ...Typography.overline,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  vehicleCard: {
    marginBottom: 12,
  },
  vHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callsign: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
  },
  vDriver: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  vBody: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: 12,
  },
  vRowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  vRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vText: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    marginLeft: 6,
  }
});
