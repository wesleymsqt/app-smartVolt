import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 24,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
    topTitle: {
        fontSize: 16,
        color: colors.textPrimary,
        lineHeight: 40,
        textAlign: 'center',
    },
  title: {
    fontSize: 21,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    lineHeight: 40,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
    marginBottom: 32,
  },
  authContainer: {
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 5,
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    marginBottom: 16,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 56,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
});
