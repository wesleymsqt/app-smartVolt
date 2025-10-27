import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Smart Volt',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  const { colorScheme } = useColorScheme();

  return (
    <>
      
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        
        <View className="gap-2 p-4">
          <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
            Olá, Seja Bem-Vindo a <Text variant="code">Smart Volt </Text>
          </Text>
        </View>
        
        <View className="flex-row gap-2">
          <Link href="/screens/login" asChild>
            <Button variant="outline">
              <Text>LOGIN</Text>
              <Icon as={StarIcon} />
            </Button>
          </Link>

          <Link href="/screens/register" asChild>
            <Button>
              <Text>CADASTRE-SE</Text>
            </Button>
          </Link>
          
        </View>
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
