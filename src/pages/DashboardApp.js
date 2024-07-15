// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  NoSaved,
  Cars,
  Visitors,
  TotalAdults,
  AppCurrentVisits,
  AppWebsiteVisits,
  FaithKids,
  Offering
} from '../sections/@dashboard/app';
import STATSLIST from '../_api_/stats';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  // console.log('Stats List: ' && STATSLIST[0]?.adult);
  console.log('Array ' && { STATSLIST });
  const lastRow = STATSLIST?.length - 1;
  return (
    <Page title="Dashboard | BBM">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">
            Hi, Welcome back. Stats Date: {STATSLIST[lastRow]?.date?.substring(0, 10)} Church:{' '}
            {STATSLIST[lastRow]?.churchId}
            {/* <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <TotalAdults ADULTS={STATSLIST[lastRow]?.adult} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FaithKids FK={STATSLIST[lastRow]?.fk} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <NoSaved SAVED={STATSLIST[lastRow]?.saved} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Offering OFFERING={STATSLIST[lastRow]?.offering} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Visitors VISITOR={STATSLIST[lastRow]?.visitors} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Cars CARS={STATSLIST[lastRow]?.car} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits StatsList={STATSLIST} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
