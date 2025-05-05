import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const DashboardScreen: React.FC = () => {
  const router = useRouter();

  // Example of handling log out
  const handleLogout = () => {
    // Implement logout logic here (e.g., clear session, tokens, etc.)
    router.push('/loginScreen');  // Redirect to login screen after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Dashboard!</Text>
      <Text style={styles.subHeader}>You are logged in successfully.</Text>

      {/* Example of a logout button */}
      <Button title="Logout" onPress={handleLogout} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
});

export default DashboardScreen;
