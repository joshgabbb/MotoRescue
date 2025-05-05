import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles/loginStyles';

const SignupScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fillError, setFillError] = useState('');

  const router = useRouter();

  const handleSignup = () => {
    console.log('handleSignup called with:', {
      username,
      email,
      password,
      confirmPassword,
    });

    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setFillError('');

    // Validation for empty fields
    if (!username || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      console.log('Validation failed: Passwords do not match');
      Alert.alert('Signup Error', 'Passwords do not match.');
      return;
    }

    console.log('All validations passed, navigating to /signupComplete');
    router.replace('/signupComplete');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to MotoRescue!</Text>
      <Text style={styles.header}>Sign Up</Text>

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

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Confirm Your Password"
          style={styles.input}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
        <Text style={styles.primaryButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {fillError ? <Text style={styles.errorText}>{fillError}</Text> : null}

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/loginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;