import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogOut } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';

type Props = {
  userName?: string;
  onLogout?: () => void;
};

export function Header({ userName = 'Anderson', onLogout }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Logo width={50} height={28} color={colors.textPrimary} />

        <TouchableOpacity onPress={onLogout}>
          <LogOut color={colors.textPrimary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Seja Bem-Vindo, {userName}</Text>
        <View style={styles.divider} />
      </View>
    </View>
  );
}
