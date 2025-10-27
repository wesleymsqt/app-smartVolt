// components/Header.tsx
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  showBackButton?: boolean;
}

export function Header({ showBackButton = true }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={{ paddingTop: insets.top }}
      className="bg-background border-b border-border"
    >
      <View className="flex-row items-center justify-between px-4 py-4">
        {showBackButton ? (
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Icon as={ArrowLeft} className="text-foreground" size={24} />
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}
        
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold">Smart Volt</Text>
        </View>
        
        <View className="w-10" />
      </View>
    </View>
  );
}