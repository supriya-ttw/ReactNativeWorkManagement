import React from 'react';
import { Text, StyleSheet } from 'react-native';

function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginVertical: 8,
  },
});

export default ErrorMessage;