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
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.borderMuted,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: colors.textSecondary,
  },
  tabText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  activeTabText: {
    fontFamily: fontFamily.bold,
    color: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: colors.textPrimary,
  },
  addButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  metaContent: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  metaValue: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: '#666',
  },
  routineTime: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  routineDays: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: '#666',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
  routineActionLabel: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
    marginBottom: 0,
  },
  routineAction: {
    fontSize: 13,
    fontFamily: fontFamily.regular,
    color: colors.textPrimary,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 8,
  },
  detailsLink: {
    fontSize: 11,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
    marginRight: 4,
  },
});
