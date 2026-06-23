import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, RefreshControl, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Layout } from '../../constants/Layout';
import { eventsService } from '../../services/events';
import { IncidentCard } from '../../components/ui/IncidentCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function IncidentsScreen() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchIncidents = useCallback(async () => {
    try {
      const data = await eventsService.getEvents();
      // Filter for active events typically, or show all based on tabs in a real app
      // We'll show all events, sorted by start_datetime desc
      setIncidents(data);
    } catch (error) {
      console.error('Failed to fetch incidents', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchIncidents();
    // Refresh every 30s
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchIncidents();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Live Feed</Text>
      <Text style={styles.subtitle}>{incidents.length} Total Incidents</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {!loading && <Text style={styles.emptyText}>No incidents reported.</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Incidents</Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={incidents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <IncidentCard 
              incident={item} 
              onPress={() => {
                // In a full app, this would navigate to a detailed view
                console.log('Pressed incident', item.id);
              }} 
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
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
    paddingBottom: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  screenTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  listContent: {
    padding: Layout.padding.screen,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
  }
});
