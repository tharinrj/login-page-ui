import { createTheme } from '@mui/material/styles';

/**
 * Tokens sampled from the supplied login design.
 * Kept in one place so components never hard-code a hex value.
 */
export const tokens = {
  ink: '#000000', // primary button + social circles
  graphite: '#12161A', // headings and high-contrast labels
  muted: '#7C8A85', // supporting copy and placeholders
  line: '#E2E8E3', // input borders and dividers
  panel: '#E9F3E4', // showcase panel background
  accent: '#3D8A47', // "Register now" link
  surface: '#FFFFFF',
} as const;

const FONT = '"Poppins", "Segoe UI", system-ui, -apple-system, sans-serif';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.ink, contrastText: tokens.surface },
    success: { main: tokens.accent },
    text: { primary: tokens.graphite, secondary: tokens.muted },
    divider: tokens.line,
    background: { default: tokens.surface, paper: tokens.surface },
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily: FONT,
    h1: {
      fontSize: 'clamp(1.9rem, 1.4rem + 1.6vw, 2.35rem)',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
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
          backgroundColor: tokens.surface,
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.line,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C8D3C9',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: tokens.graphite,
            borderWidth: 1,
          },
        },
        input: {
          paddingBlock: 14,
          paddingInline: 16,
          '&::placeholder': { color: tokens.muted, opacity: 1 },
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
