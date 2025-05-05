import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333', // Adding color for better contrast
  },
  subtext: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    paddingRight: 50, // Increased padding-right for eye icon space
    marginBottom: 15,
    fontSize: 16, // Better readability
    elevation: 2, // Adds shadow for iOS
    shadowColor: '#000', // Adds shadow for Android
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15, // Adjusted for better vertical alignment
  },
  primaryButton: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  primaryButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16, // Improved text size for buttons
  },
  divider: {
    marginVertical: 15,
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
  altButton: {
    backgroundColor: 'black',
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  altButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 8,
  },
  googleText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});

export default styles;
