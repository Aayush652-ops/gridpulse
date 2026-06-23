import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Layout } from '../constants/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { generateWeatherData } from '../data/weatherEngine';
import { formatTime } from '../utils/formatters';
import { LinearGradient } from 'expo-linear-gradient';

export default function WeatherScreen() {
  const [weather, setWeather] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = () => {
    setWeather(generateWeatherData());
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeather();
    setTimeout(() => setRefreshing(false), 500);
  };

  if (!weather) return null;

  let impactColor = Colors.success;
  if (weather.weatherSeverity > 70) impactColor = Colors.danger;
  else if (weather.weatherSeverity > 40) impactColor = Colors.warning;
  else if (weather.weatherSeverity > 20) impactColor = Colors.info;

  let iconName = 'sunny';
  if (weather.condition.includes('Rain')) iconName = 'rainy';
  else if (weather.condition.includes('Cloud')) iconName = 'cloudy';
  else if (weather.condition.includes('Thunder')) iconName = 'thunderstorm';
  else if (weather.condition.includes('Fog')) iconName = 'cloud'; // approximation

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Weather Intelligence', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }} />
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        <Card style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.location}>Bengaluru</Text>
              <Text style={styles.updated}>Updated {formatTime(weather.updatedAt)}</Text>
            </View>
            <Badge text={weather.trafficImpact} color={impactColor} />
          </View>

          <View style={styles.mainTempRow}>
            <Ionicons name={iconName} size={64} color={Colors.textPrimary} style={{ marginRight: 16 }} />
            <View>
              <Text style={styles.temp}>{weather.temperature}°</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Environmental Metrics</Text>
        <View style={styles.grid}>
          <MetricCard icon="water" label="Rainfall" value={`${weather.rainfall} mm`} />
          <MetricCard icon="leaf" label="AQI" value={weather.aqi} />
          <MetricCard icon="thermometer" label="Feels Like" value={`${weather.feelsLike}°`} />
          <MetricCard icon="water-outline" label="Humidity" value={`${weather.humidity}%`} />
          <MetricCard icon="navigate" label="Wind" value={`${weather.windSpeed} km/h ${weather.windDirection}`} />
          <MetricCard icon="eye" label="Visibility" value={`${weather.visibility} km`} />
        </View>

        <Text style={styles.sectionTitle}>Risk Analysis</Text>
        <Card>
          <RiskBar label="Flood Risk" value={weather.floodRisk} />
          <RiskBar label="Storm Risk" value={weather.stormRisk} />
          <RiskBar label="Traffic Impact Severity" value={weather.weatherSeverity} />
        </Card>

      </ScrollView>
    </View>
  );
}

function MetricCard({ icon, label, value }) {
  return (
    <Card style={styles.metricCard}>
      <Ionicons name={icon} size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );
}

function RiskBar({ label, value }) {
  let color = Colors.success;
  if (value > 70) color = Colors.danger;
  else if (value > 40) color = Colors.warning;

  return (
    <View style={styles.riskRow}>
      <View style={styles.riskHeader}>
        <Text style={styles.riskLabel}>{label}</Text>
        <Text style={[styles.riskValue, { color }]}>{value}%</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Layout.padding.screen,
    paddingBottom: 40,
  },
  heroCard: {
    padding: 24,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  location: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  updated: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
  },
  mainTempRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 70,
  },
  condition: {
    ...Typography.title,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginTop: 8,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '31%',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  metricLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  riskRow: {
    marginBottom: 16,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  riskLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  riskValue: {
    ...Typography.bodyBold,
  },
  barBackground: {
    height: 8,
    backgroundColor: Colors.borderLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  }
});
