import { createTheme } from '@mui/material/styles';

// color palette used across the app
const colors = {
  black: '#000000',
  darkGray: '#12161A',
  mutedGreen: '#7C8A85',
  borderGray: '#E2E8E3',
  lightGreen: '#E9F3E4',
  accentGreen: '#3D8A47',
  white: '#FFFFFF',
} as const;

// keep tokens export so ShowcasePanel.tsx still works
export const tokens = {
  ink: colors.black,
  graphite: colors.darkGray,
  muted: colors.mutedGreen,
  line: colors.borderGray,
  panel: colors.lightGreen,
  accent: colors.accentGreen,
  surface: colors.white,
} as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.black, contrastText: colors.white },
    success: { main: colors.accentGreen },
    text: { primary: colors.darkGray, secondary: colors.mutedGreen },
    divider: colors.borderGray,
    background: { default: colors.white, paper: colors.white },
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily: '"Poppins", "Segoe UI", system-ui, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.45 },
    body1: { fontSize: '0.875rem', lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.65 },
    caption: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { fontSize: '0.9375rem', fontWeight: 600 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { WebkitFontSmoothing: 'antialiased' },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          paddingBlock: 12,
        },
        contained: {
          '&:hover': { backgroundColor: '#1F1F1F' },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.borderGray },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#C8D3C9' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.darkGray,
            borderWidth: 1,
          },
        },
        input: {
          paddingBlock: 14,
          paddingInline: 16,
          '&::placeholder': { color: colors.mutedGreen, opacity: 1 },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: { marginInline: 4, fontSize: '0.7rem' },
      },
    },

    MuiLink: {
      defaultProps: { underline: 'none' },
    },
  },
});

export default theme;
