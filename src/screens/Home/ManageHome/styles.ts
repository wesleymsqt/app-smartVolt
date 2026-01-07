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
  heroCard: {
    backgroundColor: colors.textSecondary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  heroTitle: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: '#FFF',
    opacity: 0.9,
  },
  heroValue: {
    fontSize: 36,
    fontFamily: fontFamily.bold,
    color: '#FFF',
    marginBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: '#FFF',
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
  },
  groupsGrid: {
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
    fontFamily: fontFamily.regular,
  },
  groupCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  groupCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupCardTitle: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
  },
  groupCardStatus: {
    fontSize: 14,
    color: '#666',
    fontFamily: fontFamily.regular,
    marginBottom: 16,
  },
  groupCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  detailsLink: {
    fontSize: 12,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
    marginRight: 4,
  },
});
