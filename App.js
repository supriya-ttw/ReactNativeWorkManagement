
import React from 'react';
import Config from 'react-native-config';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppButton from './src/components/AppButton';

const Stack = createNativeStackNavigator();


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WorkManagement</Text>
      <Text style={styles.subtitle}>Welcome to your workspace!</Text>

      {/* Temporary environment configuration check */}
      <Text>Environment: {Config.APP_ENV}</Text>
      <Text style={{ marginBottom: 24 }}>
        API URL: {Config.API_BASE_URL}
      </Text>

      <AppButton
        title="Go to Tasks"
        onPress={() => navigation.navigate('Tasks')}
      />
    </View>
  );
}


function TasksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <Text style={styles.subtitle}>
        Your tasks will appear here.
      </Text>

      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Tasks"
          component={TasksScreen}
          options={{ title: 'Tasks' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#6B7280',
  },
});
