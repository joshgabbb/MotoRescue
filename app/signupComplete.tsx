import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './styles/loginStyles';

const SignupComplete: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    console.log('Log In button pressed, navigating to /loginScreen');
    router.replace('/loginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up Complete</Text>
      <Text style={[styles.header, { marginBottom: 30 }]}>You may now log in.</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupComplete;