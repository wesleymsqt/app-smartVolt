import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import { colors } from '@/theme/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type Props = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export function Button({ title, variant = 'primary', isLoading = false, icon, style, ...rest }: Props) {
  const buttonStyle =
    variant === 'primary' ? styles.primary : variant === 'secondary' ? styles.secondary : styles.outline;

  const textStyle =
    variant === 'primary' ? styles.textPrimary : variant === 'secondary' ? styles.textSecondary : styles.textOutline;

  return (
    <TouchableOpacity style={[styles.container, buttonStyle, style]} disabled={isLoading} activeOpacity={0.7} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.textPrimary : '#FFF'} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
