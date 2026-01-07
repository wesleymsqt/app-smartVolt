import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },

  primary: {
    backgroundColor: colors.textPrimary, // Cor Escura
    borderWidth: 0,
  },

  secondary: {
    backgroundColor: colors.textSecondary, // Cor de Destaque (antiga danger)
    borderWidth: 0,
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.textPrimary,
  },

  text: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },

  textPrimary: {
    color: '#FFF',
  },

  textSecondary: {
    color: '#FFF',
  },

  textOutline: {
    color: colors.textPrimary,
  },

  icon: {
    marginRight: 8,
  },
});
