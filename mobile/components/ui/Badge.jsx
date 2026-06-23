import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Typography } from '../../constants/Typography';

export function Badge({ text, color = Colors.primary, style, textStyle }) {
  return (
    <View style={[styles.badge, { backgroundColor: `${color}20`, borderColor: color }, style]}>
      <Text style={[styles.text, { color }, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    ...Typography.overline,
  }
});
