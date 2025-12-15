// Color palette inspired by Color Hunt
// https://colorhunt.co/palette/ebf4dd90ab8b5a78633b4953

const palette = {
  cream: {
    50: '#F7FBF2',
    100: '#EBF4DD',
    200: '#DCEBC0',
  },
  sage: {
    400: '#B4C6B1',
    500: '#90AB8B',
    600: '#759170',
  },
  green: {
    700: '#5A7863',
    800: '#455E4C',
  },
  slate: {
    800: '#3B4953',
    900: '#2A353D',
  },
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
};

export const colors = {
  background: palette.cream[100],
  surface: palette.common.white,

  textPrimary: palette.slate[800],
  textSecondary: palette.sage[600],
  textInverted: palette.common.white,

  primary: palette.green[700],
  secondary: palette.sage[500],

  muted: palette.sage[400],

  border: palette.slate[800],
  borderMuted: palette.sage[400],

  white: palette.common.white,
  transparent: palette.common.transparent,
};
