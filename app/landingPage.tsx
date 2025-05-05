import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  findNodeHandle,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const scaleFont = (size: number) => Math.min((width / 375) * size, size * 1.5); // Cap scaling
const scalePadding = (size: number) => (width / 375) * size;

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams<{ username: string }>();
  const featuresRef = useRef<View>(null);
  const aboutRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<View>) => {
    if (ref.current && scrollViewRef.current) {
      const scrollViewNode = findNodeHandle(scrollViewRef.current);
      if (scrollViewNode) {
        ref.current.measureLayout(
          scrollViewNode,
          (x: number, y: number, width: number, height: number) => {
            scrollViewRef.current?.scrollTo({ y, animated: true });
          },
          () => console.error('Failed to measure layout')
        );
      }
    }
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out');
    router.push('/loginScreen');
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View
        style={[
          styles.sidebar,
          { transform: [{ translateX: isSidebarOpen ? 0 : -width * 0.7 }] },
        ]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
          <Ionicons name="close" size={scaleFont(24)} color="#fff" />
        </TouchableOpacity>
        <View style={styles.sidebarContent}>
          <Text style={styles.usernameText}>
            Welcome, {username || 'User'}!
          </Text>
          <TouchableOpacity
            style={styles.sidebarItem}
            onPress={() => scrollToSection(featuresRef)}
          >
            <Text style={styles.sidebarText}>Features</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sidebarItem}
            onPress={() => scrollToSection(aboutRef)}
          >
            <Text style={styles.sidebarText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={scaleFont(30)} color="#f45b69" />
          </TouchableOpacity>
          <Text style={styles.headerText}>MotoRescue</Text>
          <View style={{ width: scalePadding(30) }} />
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>Emergency Help, Right Now!</Text>
          <Text style={styles.heroSubtitle}>
            MotoRescue connects you to medical responders instantly with GPS tracking and SOS alerts.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sosButton}
              onPress={() => router.push('/SOS')}
            >
              <Text style={styles.buttonText}>SOS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.findButton}
              onPress={() => router.push('/FIND')}
            >
              <Text style={styles.buttonText}>Find Emergency Responders</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonNote}>Access these features in the MotoRescue app.</Text>
        </View>

        {/* Features Section */}
        <View ref={featuresRef} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Why MotoRescue?</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Instant SOS Alerts</Text>
              <Text style={styles.featureText}>
                Send an SOS signal to alert nearby responders in seconds.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Real-Time GPS Tracking</Text>
              <Text style={styles.featureText}>
                Share your location for quick and accurate assistance.
              </Text>
            </View>
            <View style={styles.featureCard}>
              <Text style={styles.featureTitle}>Secure Sign-Up/Login</Text>
              <Text style={styles.featureText}>
                Access the app securely with Google or email authentication.
              </Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View ref={aboutRef} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About MotoRescue</Text>
          <Text style={styles.sectionText}>
            The app MotoRescue functions as an emergency response system that delivers quick and effective assistance for anyone in the public. Users can connect through MotoRescue to the nearest medical responders in real-time since it focuses on emergency health and safety above other ride services. The application provides trackable GPS and SOS alert features and The technology will guide the safety of others with MotoRescue your safety will arrive fast.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>© 2025 MotoRescue. All rights reserved.</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => scrollToSection(featuresRef)}>
              <Text style={styles.footerLink}>Features</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToSection(aboutRef)}>
              <Text style={styles.footerLink}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Sidebar
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%', // Percentage-based width
    height: '100%',
    backgroundColor: '#f45b69',
    zIndex: 10,
    paddingTop: scalePadding(40),
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: scalePadding(20),
    right: scalePadding(20),
  },
  sidebarContent: {
    flex: 1,
    padding: scalePadding(20),
  },
  usernameText: {
    fontSize: scaleFont(22),
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: scalePadding(20),
  },
  sidebarItem: {
    paddingVertical: scalePadding(15),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  sidebarText: {
    fontSize: scaleFont(18),
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: scalePadding(20),
    backgroundColor: '#fff',
    padding: scalePadding(15),
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: scaleFont(18),
    color: '#f45b69',
    fontWeight: 'bold',
  },
  // Content
  content: {
    flex: 1,
  },
  // Header
  headerContainer: {
    backgroundColor: '#ffe5e5',
    paddingVertical: scalePadding(20),
    paddingHorizontal: scalePadding(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: scaleFont(28),
    fontWeight: 'bold',
    color: '#f45b69',
  },
  // Hero
  heroContainer: {
    backgroundColor: '#f45b69',
    padding: scalePadding(40),
    alignItems: 'center',
    minHeight: '40%', // Percentage-based height
  },
  heroTitle: {
    fontSize: scaleFont(36),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: scalePadding(10),
  },
  heroSubtitle: {
    fontSize: scaleFont(18),
    color: '#fff',
    textAlign: 'center',
    marginBottom: scalePadding(20),
    maxWidth: '90%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scalePadding(10),
    flexWrap: 'wrap',
  },
  sosButton: {
    backgroundColor: '#dc2626',
    padding: scalePadding(15),
    borderRadius: 10,
    marginHorizontal: scalePadding(5),
    minWidth: '40%', // Percentage-based width
  },
  findButton: {
    backgroundColor: '#000',
    padding: scalePadding(15),
    borderRadius: 10,
    marginHorizontal: scalePadding(5),
    minWidth: '40%', // Percentage-based width
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonNote: {
    fontSize: scaleFont(12),
    color: '#fff',
    textAlign: 'center',
    marginTop: scalePadding(10),
  },
  // Features
  sectionContainer: {
    padding: scalePadding(20),
    backgroundColor: '#f4f4f4',
  },
  sectionTitle: {
    fontSize: scaleFont(24),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: scalePadding(20),
  },
  featuresGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: '#ffe5e5',
    padding: scalePadding(20),
    borderRadius: 10,
    marginBottom: scalePadding(15),
    width: '90%', // Percentage-based width
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  featureTitle: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: scalePadding(10),
  },
  featureText: {
    fontSize: scaleFont(14),
    color: '#666',
    textAlign: 'center',
  },
  // About
  sectionText: {
    fontSize: scaleFont(16),
    color: '#666',
    textAlign: 'center',
    maxWidth: '90%',
    alignSelf: 'center',
  },
  // Footer
  footerContainer: {
    backgroundColor: '#333',
    padding: scalePadding(20),
    alignItems: 'center',
  },
  footerText: {
    fontSize: scaleFont(14),
    color: '#fff',
  },
  footerLinks: {
    flexDirection: 'row',
    marginTop: scalePadding(10),
  },
  footerLink: {
    fontSize: scaleFont(14),
    color: '#ccc',
    marginHorizontal: scalePadding(10),
  },
});

export default LandingPage; 