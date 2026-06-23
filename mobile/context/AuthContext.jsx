import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('operator');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const savedRole = await AsyncStorage.getItem('userRole');
      if (savedRole) {
        setRole(savedRole);
      }
      
      if (token) {
        const userData = await authService.validateSession(token);
        if (userData) {
          setUser(userData);
        } else {
          // Token invalid or expired
          await AsyncStorage.removeItem('userToken');
        }
      }
    } catch (e) {
      console.error('Failed to load user', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, selectedRole) => {
    const result = await authService.login(username, password);
    setUser(result);
    setRole(selectedRole || result.role || 'operator');
    if (result.token) {
      await AsyncStorage.setItem('userToken', result.token);
      await AsyncStorage.setItem('userRole', selectedRole || result.role || 'operator');
    }
    return result;
  };

  const register = async (username, password, selectedRole) => {
    const result = await authService.register(username, password);
    if (result.message === "User registered successfully") {
      return await login(username, password, selectedRole);
    }
    return result;
  };

  const logout = async () => {
    await authService.logout();
    await AsyncStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
