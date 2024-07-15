import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { EventForm } from '../../sections/authentication/register';

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

export default function AddEvent() {
  return (
    <RootStyle title="Add Event | BBM">
      <AuthLayout>
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/app/event-display">
          back to events lists
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          There's time for everything.
        </Typography>
        <img alt="register" src="/static/prev.png" />
      </SectionStyle>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Add event into the Calendar by department.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Detailing the date, time, department and region.
            </Typography>
          </Box>
          <EventForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
