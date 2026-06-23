import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Layout } from '../constants/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { eventsService } from '../services/events';
import { LinearGradient } from 'expo-linear-gradient';

export default function CorridorScreen() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [corridor, setCorridor] = useState(null);

  const handleGenerate = async () => {
    if (!source || !destination) return;
    setLoading(true);
    
    try {
      // Simulate API call to green corridor routing engine
      await new Promise(r => setTimeout(r, 1500));
      
      setCorridor({
        id: `GC-${Math.floor(Math.random() * 10000)}`,
        distance: '12.4 km',
        etaOld: '45 mins',
        etaNew: '18 mins',
        timeSaved: '27 mins',
        signalsControlled: 14,
        status: 'Active',
        route: ['Koramangala', 'Inner Ring Road', 'Domlur', 'Indiranagar', 'Old Madras Road', 'CV Raman Hospital']
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Green Corridor AI', headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }} />
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Card>
          <Text style={styles.cardTitle}>Emergency Routing</Text>
          
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color={Colors.success} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Source (e.g. Accident Site)"
              placeholderTextColor={Colors.textMuted}
              value={source}
              onChangeText={setSource}
            />
          </View>

          <View style={styles.connector}>
            <View style={styles.connectorLine} />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="medical-outline" size={20} color={Colors.danger} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Destination (e.g. Hospital)"
              placeholderTextColor={Colors.textMuted}
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <TouchableOpacity 
            style={[styles.btn, (!source || !destination) && styles.btnDisabled]} 
            onPress={handleGenerate}
            disabled={!source || !destination || loading}
          >
            <LinearGradient
              colors={Colors.gradientSuccess}
              style={styles.btnGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="git-network" size={20} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={styles.btnText}>Generate Corridor</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Card>

        {corridor && (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultTitle}>Corridor {corridor.id}</Text>
              <Badge text="ACTIVE" color={Colors.success} />
            </View>

            <View style={styles.statsRow}>
              <Card style={styles.statCard}>
                <Text style={styles.statLabel}>Standard ETA</Text>
                <Text style={[styles.statValue, { color: Colors.warning }]}>{corridor.etaOld}</Text>
              </Card>
              <Card style={styles.statCard}>
                <Text style={styles.statLabel}>Corridor ETA</Text>
                <Text style={[styles.statValue, { color: Colors.success }]}>{corridor.etaNew}</Text>
              </Card>
            </View>

            <Card style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="timer" size={20} color={Colors.primary} />
                <Text style={styles.infoText}>Time Saved: <Text style={{color: Colors.textPrimary, fontWeight: 'bold'}}>{corridor.timeSaved}</Text></Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="traffic-cone" size={20} color={Colors.warning} />
                <Text style={styles.infoText}>Signals Overridden: <Text style={{color: Colors.textPrimary, fontWeight: 'bold'}}>{corridor.signalsControlled}</Text></Text>
              </View>
            </Card>

            <Text style={styles.sectionTitle}>Route Plan</Text>
            <Card style={styles.routeCard}>
              {corridor.route.map((point, index) => (
                <View key={index} style={styles.routeStep}>
                  <View style={styles.stepIndicator}>
                    <View style={styles.stepDot} />
                    {index < corridor.route.length - 1 && <View style={styles.stepLine} />}
                  </View>
                  <Text style={styles.stepText}>{point}</Text>
                </View>
              ))}
            </Card>
            
            <TouchableOpacity style={styles.abortBtn} onPress={() => setCorridor(null)}>
              <Text style={styles.abortBtnText}>Deactivate Corridor</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
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
  cardTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    height: '100%',
  },
  connector: {
    height: 20,
    marginLeft: 26,
    borderLeftWidth: 2,
    borderLeftColor: Colors.borderLight,
    borderStyle: 'dashed',
  },
  connectorLine: {
    display: 'none',
  },
  btn: {
    height: 56,
    borderRadius: Layout.radius.md,
    marginTop: 24,
    overflow: 'hidden',
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    ...Typography.bodyBold,
    color: '#fff',
  },
  resultContainer: {
    marginTop: 24,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 0,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    ...Typography.title,
  },
  infoCard: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: 12,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginTop: 16,
    marginBottom: 16,
  },
  routeCard: {
    padding: 20,
  },
  routeStep: {
    flexDirection: 'row',
  },
  stepIndicator: {
    alignItems: 'center',
    width: 20,
    marginRight: 16,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    zIndex: 2,
  },
  stepLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.borderLight,
    marginTop: -2,
    marginBottom: -2,
    zIndex: 1,
  },
  stepText: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    marginTop: -4,
    paddingBottom: 24,
  },
  abortBtn: {
    marginTop: 24,
    padding: 16,
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    borderColor: Colors.danger,
    alignItems: 'center',
  },
  abortBtnText: {
    ...Typography.bodyBold,
    color: Colors.danger,
  }
});
