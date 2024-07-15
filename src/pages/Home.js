/* eslint-disable */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Button } from '@mui/material';
import Iconify from '../components/Iconify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontSize: '10em',
  direction: 'inline-grid'
}));

const ButtonClick = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  display: 'inline'
}));

const getIcon = (name) => <Iconify icon={name} fontSize="xxx-large" />;


const MENU_ITMES = [
    {
        icon : getIcon('eva:home-fill'),
        itemName : 'Church',
        url: 'login'
    },
    {
        icon : getIcon('eva:calendar-outline'),
        itemName : 'Calendar',
        url: '/app/event-menu'
    },
    {
        icon : getIcon('eva:layers-outline'),
        itemName : 'Assets Inventory',
        url: 'login'
    },
    {
        icon : getIcon('eva:book-open-outline'),
        itemName : 'Bush Camp',
        url: 'login'
    },
    {
        icon : getIcon('eva:monitor-outline'),
        itemName : 'Registration',
        url: '/registration'
    },
    {
        icon : getIcon('eva:gift-outline'),
        itemName : 'Gear',
        url: '/login'
    }
]

function FormRow({ name = 'Reports', icon =  getIcon('eva:layers-outline'), url = '/' }) {
  const navigate = useNavigate();
  return (
   <Grid item xs={4}>
      <Item>
        <ButtonClick onClick={()=>navigate(url)}>
          {icon}
          <br />
          {name}
        </ButtonClick>
      </Item>
    </Grid>
  );
}

export default function SvgIconsSize() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          {MENU_ITMES.map((item, index) =>{
            return <FormRow icon={item.icon} name={item.itemName} url={item.url} />
          })   
         }
        </Grid>
      </Grid>
    </Box>
  );
}
