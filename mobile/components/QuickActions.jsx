import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { Layout } from '../constants/Layout';
import { useRouter } from 'expo-router';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    { id: 'copilot', icon: 'chatbubbles', label: 'AI Copilot', route: '/copilot', color: Colors.primary },
    { id: 'corridor', icon: 'git-network', label: 'Corridor', route: '/corridor', color: Colors.success },
    { id: 'weather', icon: 'partly-sunny', label: 'Weather', route: '/weather', color: Colors.warning },
    { id: 'simulate', icon: 'add-circle', label: 'Simulate', route: '/(tabs)/incidents', color: Colors.info },
  ];

  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <TouchableOpacity 
          key={action.id} 
          style={styles.actionCard}
          onPress={() => router.push(action.route)}
        >
          <View style={[styles.iconContainer, { backgroundColor: `${action.color}20` }]}>
            <Ionicons name={action.icon} size={28} color={action.color} />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
  }
});
