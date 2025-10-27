import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { Header } from '@/components/Header';

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          // Header padrão para todas as telas
          header: (props) => <Header showBackButton={props.navigation.canGoBack()} />,
        }}
      >
        {/* Apenas a tela index sem header */}
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        
        {/* Todas as outras telas terão o Header automaticamente */}
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}