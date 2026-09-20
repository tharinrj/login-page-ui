import Divider from '@mui/material/Divider';

export default function OrDivider() {
  return (
    <Divider
      sx={{
        my: 2.75,
        color: 'text.secondary',
        fontSize: '0.75rem',
        '&::before, &::after': { borderColor: 'divider' },
      }}
    >
      or continue with
    </Divider>
  );
}
