import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useRouter, Slot } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  const router = useRouter();

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  } as any);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '392866798805-jfjt0vjv3pqlbso4ahh6jh6n2tjov2b5.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      router.push('/landingPage'); // Updated to match new flow
    } else if (response?.type === 'error') {
      console.error('Google login error:', response.error);
    }
  }, [response, router]);

  return <Slot />;
}