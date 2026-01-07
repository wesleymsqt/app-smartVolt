import { StyleSheet, Platform, StatusBar } from 'react-native';
import { fontFamily } from '@/theme/fonts';
import { colors } from '@/theme/colors';

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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: fontFamily.bold,
    color: '#000',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: '#0F172A', 
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    padding: 12,
    marginBottom: 24,
    fontFamily: fontFamily.regular,
  },
  listContainer: {
    gap: 12,
    marginBottom: 32,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    padding: 16,
  },
  deviceName: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#64748B', 
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  buttonOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#64748B',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonFilled: {
    flex: 1,
    backgroundColor: '#9CA3AF',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonTextBlack: {
    fontFamily: fontFamily.bold,
    color: '#000',
  },
  buttonTextWhite: {
    fontFamily: fontFamily.bold,
    color: '#FFF',
  },
});