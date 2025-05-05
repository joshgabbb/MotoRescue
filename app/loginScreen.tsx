import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import styles from './styles/loginStyles';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fillError, setFillError] = useState(''); // New state for "Fill in first" message

  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '392866798805-jfjt0vjv3pqlbso4ahh6jh6n2tjov2b5.apps.googleusercontent.com',
  });

  useEffect(() => {
    console.log('Google login response:', response);
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        console.log('Google Login Successful: ID token received');
        router.push({
          pathname: '/landingPage',
          params: { username: 'Google User' },
        });
      } else {
        console.error('Google Login Failed: No ID token');
        Alert.alert('Google Login Failed', 'No ID token received.');
      }
    } else if (response?.type === 'error') {
      console.error('Google Login Error:', response.error);
      Alert.alert('Google Login Failed', response.error?.message || 'Unknown error');
    }
  }, [response]);

  const handleGoogleLogin = async () => {
    try {
      if (request) {
        console.log('Initiating Google login');
        await promptAsync();
      } else {
        console.log('Google login request not ready');
        Alert.alert('Error', 'Google login not ready yet.');
      }
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Google Login Failed', String(error));
    }
  };

  const handleLogin = () => {
    console.log('handleLogin called with:', { username, email, password });

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setFillError('');

    // Validation for empty fields
    if (!username || !email || !password) {
      console.log('Validation failed: Missing fields');
      setFillError('Fill in first');
      return;
    }

    // Email validation: Must contain exactly one @ symbol
    const emailRegex = /^[^@]+@[^@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email (missing @ symbol)');
      setEmailError('Email must contain an @ symbol (e.g., user@domain).');
      return;
    }

    // Password validation: At least 8 characters
    if (password.length < 8) {
      console.log('Validation failed: Password too short');
      setPasswordError('Password must be at least 8 characters long.');
      return;
    }

    console.log('All validations passed, navigating to /landingPage');
    router.push({
      pathname: '/landingPage',
      params: { username },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MotoRescue!</Text>
      <Text style={styles.header}>Login:</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        placeholder="Enter Your Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="user@domain"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Enter Your Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <View style={styles.optionsRow}>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>

      {fillError ? <Text style={styles.errorText}>{fillError}</Text> : null}

      <Text style={styles.divider}>Or With</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/signupScreen')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;