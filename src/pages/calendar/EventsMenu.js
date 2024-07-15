import { List, ListItem, ListItemButton, Box, ListItemIcon, Divider, ListItemText } from '@mui/material';
import Iconify from '../../components/Iconify';
import { useNavigate } from 'react-router-dom';

export default function EventCalendar() {
  const navigate = useNavigate();

    return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List style={{ paddingBottom: 0, paddingTop: 0, background: 'darkcyan', color: 'white' }}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon >
                <Iconify icon='eva:calendar-outline' fontSize="xx-large" />
              </ListItemIcon>
              <ListItemText primary="Annual 2024 Calendar" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider variant="fullWidth"/>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/app/event-display")}>
              <ListItemText primary="National Calendar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("")}>
              <ListItemText primary="Regional Calendar" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}