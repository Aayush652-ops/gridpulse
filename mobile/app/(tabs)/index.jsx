import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Layout } from '../../constants/Layout';
import { Config } from '../../constants/Config';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { CityHealthScore } from '../../components/CityHealthScore';
import { QuickActions } from '../../components/QuickActions';
import { eventsService } from '../../services/events';
import { generateWeatherData } from '../../data/weatherEngine';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    activeIncidents: 0,
    criticalIncidents: 0,
    severityBreakdown: { high: 0, medium: 0, low: 0 },
    weatherScore: 100,
    healthScore: 100,
    subscores: { traffic: 100, emergency: 100, weather: 100 },
    predictionConfidence: 92,
  });

  const loadDashboardData = useCallback(async () => {
    try {
      // Fetch active incidents
      const activeEvents = await eventsService.getActiveEvents();
      const weather = generateWeatherData();

      let critical = 0;
      let breakdown = { high: 0, medium: 0, low: 0 };
      
      activeEvents.forEach(e => {
        if (e.priority?.toLowerCase() === 'high' || e.severity_score >= 75) {
          critical++;
          breakdown.high++;
        } else if (e.priority?.toLowerCase() === 'medium' || e.severity_score >= 40) {
          breakdown.medium++;
        } else {
          breakdown.low++;
        }
      });

      // Compute scores
      const trafficScore = Math.max(0, 100 - (activeEvents.length * 2) - (critical * 5));
      const weatherScore = 100 - weather.weatherSeverity;
      const emergencyScore = 95; // Simulated readiness
      const healthScore = Math.round((trafficScore * 0.5) + (weatherScore * 0.2) + (emergencyScore * 0.3));

      setData({
        activeIncidents: activeEvents.length,
        criticalIncidents: critical,
        severityBreakdown: breakdown,
        weatherScore: Math.round(weatherScore),
        healthScore,
        subscores: {
          traffic: Math.round(trafficScore),
          emergency: emergencyScore,
          weather: Math.round(weatherScore),
        },
        predictionConfidence: 94,
      });

    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, Config.POLLING.EVENTS);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Command Center</Text>
          <Text style={styles.userRole}>
            {user?.username} • {user?.role ? user.role.replace('_', ' ').toUpperCase() : 'OPERATOR'}
          </Text>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color={Colors.primary} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <Text style={styles.sectionTitle}>City Health</Text>
        <Card variant="glass">
          <CityHealthScore score={data.healthScore} subscores={data.subscores} />
        </Card>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="warning" size={20} color={Colors.warning} />
              <Text style={styles.statTitle}>Active Incidents</Text>
            </View>
            <Text style={styles.statValue}>{data.activeIncidents}</Text>
            <Text style={styles.statSubtitle}>{data.criticalIncidents} Critical</Text>
          </Card>
          
          <Card style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="analytics" size={20} color={Colors.success} />
              <Text style={styles.statTitle}>AI Confidence</Text>
            </View>
            <Text style={styles.statValue}>{data.predictionConfidence}%</Text>
            <Text style={styles.statSubtitle}>Based on 500+ events</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActions />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Layout.statusBarHeight + 20,
    paddingHorizontal: Layout.padding.screen,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  greeting: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  userRole: {
    ...Typography.captionBold,
    color: Colors.primary,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: Layout.padding.screen,
    paddingBottom: 100,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: 16,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitle: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  statValue: {
    ...Typography.metricSmall,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  statSubtitle: {
    ...Typography.overline,
    color: Colors.textMuted,
  }
});
