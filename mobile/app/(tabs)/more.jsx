import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';
import { Layout } from '../../constants/Layout';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function MoreScreen() {
  const { user, role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout', 
        style: 'destructive', 
        onPress: async () => {
          await logout();
          router.replace('/login');
        } 
      },
    ]);
  };

  const MenuItem = ({ icon, label, route, color = Colors.primary, destructive }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={() => route ? router.push(route) : handleLogout()}
    >
      <View style={[styles.menuIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.menuLabel, destructive && { color: Colors.danger }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color={Colors.borderLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradientDark} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Menu</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.username?.charAt(0)?.toUpperCase() || 'U'}</Text>
          </View>
          <View>
            <Text style={styles.username}>{user?.username || 'User'}</Text>
            <Text style={styles.role}>{role?.replace('_', ' ').toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Intelligence Modules</Text>
        <View style={styles.card}>
          <MenuItem icon="chatbubbles" label="AI Copilot" route="/copilot" />
          <MenuItem icon="git-network" label="Green Corridor" route="/corridor" />
          <MenuItem icon="partly-sunny" label="Weather Center" route="/weather" />
        </View>

        <Text style={styles.sectionTitle}>Analytics</Text>
        <View style={styles.card}>
          <MenuItem icon="bar-chart" label="Operational Analytics" color={Colors.success} route="/analytics/operational" />
          <MenuItem icon="leaf" label="Sustainability" color={Colors.success} route="/analytics/sustainability" />
          <MenuItem icon="git-merge" label="Shockwave Simulator" color={Colors.warning} route="/analytics/shockwave" />
        </View>

        <Text style={styles.sectionTitle}>System</Text>
        <View style={styles.card}>
          <MenuItem icon="settings" label="Settings" color={Colors.textSecondary} route="/settings" />
          <MenuItem icon="log-out" label="Logout" color={Colors.danger} destructive />
        </View>

        <Text style={styles.version}>GridPulse Commander v1.0.0</Text>
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
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.headline,
    color: Colors.textPrimary,
  },
  scrollContent: {
    padding: Layout.padding.screen,
    paddingBottom: 100,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatarText: {
    ...Typography.headline,
    color: Colors.primary,
  },
  username: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  role: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    ...Typography.captionBold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.radius.lg,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    ...Typography.bodyBold,
    color: Colors.textPrimary,
    flex: 1,
  },
  version: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 16,
  }
});
