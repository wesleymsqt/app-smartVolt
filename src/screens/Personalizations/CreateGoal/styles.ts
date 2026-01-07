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
    paddingBottom: 100,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 8,
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
    marginBottom: 24,
  },
  searchGroupInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderMuted,
  },
  itemLabel: {
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: colors.textPrimary,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.textPrimary,
  },
  checkboxButton: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActiveBorder: {
    borderColor: colors.textPrimary,
  },
  checkboxSelected: {
    height: 10,
    width: 10,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },
  footerButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
});
