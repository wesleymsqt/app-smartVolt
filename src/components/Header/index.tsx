import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LogOut, ArrowLeft } from 'lucide-react-native';

import { styles } from './styles';
import { colors } from '@/theme/colors';
import { Logo } from '@/components/Logo';

type Props = {
  userName?: string;
  title?: string;
  onLogout?: () => void;
  onBack?: () => void;
};

export function Header({ userName = 'Anderson', title, onLogout, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onBack ? (
          <TouchableOpacity onPress={onBack}>
            <ArrowLeft color={colors.textPrimary} size={24} />
          </TouchableOpacity>
        ) : (
          <Logo width={50} height={28} color={colors.textPrimary} />
        )}

        <TouchableOpacity onPress={onLogout}>
          <LogOut color={colors.textPrimary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        {title ? (
          <Text style={styles.pageTitle}>{title}</Text>
        ) : (
          <Text style={styles.greetingText}>Seja Bem-Vindo, {userName}</Text>
        )}

        <View style={styles.divider} />
      </View>
    </View>
  );
}
