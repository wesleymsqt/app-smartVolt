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
  inputGroup: {
    marginBottom: 24,
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
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderMuted,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  dayButtonActive: {
    backgroundColor: colors.textSecondary,
  },
  dayText: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  dayTextActive: {
    color: '#FFF',
  },
  timeRow: {
    flexDirection: 'row',
  },
  subLabel: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
    marginBottom: 4,
    opacity: 0.7,
  },
  timeInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 8,
    height: 48,
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  deviceListContainer: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    overflow: 'hidden',
    marginBottom: 32,
  },
  groupItem: {
    backgroundColor: colors.surface,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  groupTitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  devicesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: colors.surface,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  deviceName: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.textPrimary,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 10,
    fontFamily: fontFamily.bold,
  },
  footerButtons: {
    marginTop: 8,
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
  },
});
