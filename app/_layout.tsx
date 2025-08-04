import { Stack } from 'expo-router';
import { ThemeProvider } from '@/components/theme-provider';
import '@/index.css';

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}