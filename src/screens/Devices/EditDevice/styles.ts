import { StyleSheet, Platform, StatusBar } from 'react-native';
import { colors } from '@/theme/colors';
import { fontFamily } from '@/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    padding: 24,
  },

  label: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 12,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 48,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 24,
  },

  groupContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    padding: 16,
    marginBottom: 32,
  },
  searchGroupInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
    fontSize: 14,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.textPrimary,
  },

  footerButtons: {
    gap: 12,
    marginTop: 12,
    marginBottom: 80,
  },

  buttonSave: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textSecondary,
  },

  buttonRemove: {
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textPrimary,
  },

  buttonCancel: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },

  buttonTextWhite: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.white,
  },
  buttonTextDark: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
});
