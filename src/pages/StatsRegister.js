import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Link, Typography, Button } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { StatsForm } from '../sections/authentication/register';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function StatsRegister() {
  return (
    <RootStyle title="Stats | BBM">
      <AuthLayout>
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/app/stats">
          back to the stats list
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Be thou diligent to know the state of thy flocks, And look well to thy herds.
        </Typography>
        <img alt="register" src="/static/illustrations/stats.png" />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Add Stats details.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Add this week's Sunday service stats
            </Typography>
          </Box>
          <StatsForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
