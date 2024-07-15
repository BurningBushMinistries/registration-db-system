import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Card, Stack, Container, Typography, Alert, IconButton } from '@mui/material';
// components
import Page from '../components/Page';

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

const background = '/static/prev.png';
const logo = '/static/logo.jpg';

// ----------------------------------------------------------------------

export default function Auth() {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate('/login', { replace: true });
  };

  return (
    <RootStyle title="Authentication | BBM">
      {/* <AuthLayout /> */}
      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* <Typography variant="h3" sx={{ px: 5, mt: 0, mb: 3 }}>
          Reporting System
        </Typography> */}
        <img src={logo} width="auto" height="auto" alt="Burning Bush Ministries" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 1, alignContent: 'Center%' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to BBM Reporting System
            </Typography>
            <img src={background} width="auto" height="auto" alt="Burning Bush Ministries" />
          </Stack>
          <Stack sx={{ width: '100%' }} background-color="black" spacing={2}>
            {/* <Alert variant="outlined" severity="info">
              Your Temperature is 28 C
            </Alert>
            <Alert variant="outlined" severity="error">
              Please wear your face mask
            </Alert> */}
            <Alert onClick={gotoLogin} variant="outlined" severity="success">
              Click to Goto Login Menu
            </Alert>
          </Stack>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
