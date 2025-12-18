import { StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingContainer: {
    alignItems: 'center',
    gap: 8,
  },
  greetingText: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.textPrimary,
    width: '100%',
    marginTop: 8,
  },
});
