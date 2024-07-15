import * as React from 'react';
// material
import {
  Box,
  Button,
  ListItemText,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CALENDARLIST from '../../_api_/calendar';
import Iconify from '../../components/Iconify';
import CardItem from './CardItem';
import './DisplayEvent.css';
// ----------------------------------------------------------------------

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Row(props: { row: ReturnType<typeof CALENDARLIST>, month: String }) {
  const { row, month } = props;

  return (
    <React.Fragment>
      <CardItem eventRows={row} month={month}/>
    </React.Fragment>
  );
}

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


export default function CollapsibleTable() {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <TableContainer style={{ display: 'inlineTable', verticalAlign: 'super', width: '100%', overflow: 'auto'}} component={Paper}>
      <Table aria-label="collapsible table" style={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead style={{ top: 0, borderBottom: '0px', position: 'sticky', zIndex: '1',  }}>
          <TableRow  style={{ borderBottom: '0px'  }}>
            <TableCell style={{ background: 'darkcyan', color: 'white'}}>
              <ListItemText primary="2024 Ministry Calendar" />
            </TableCell>
            <TableCell align="right" style={{ background: 'darkcyan'}}>
              <Button
              variant="contained"
              onClick={() => navigate("/add-event")}
              startIcon={<Iconify icon="eva:plus-fill" />}
              >
              Add
              </Button>
            </TableCell>
            
          </TableRow>
          <TableRow>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
            >
              {months?.map((month, index) => (
                <Tab key={index} label={month} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>   

          </TableRow>
        </TableHead>
        <TableBody style={{ overflowY: 'auto' }}>
            {months?.map((month, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
              <Row  row={CALENDARLIST} month={month}/> 
            </CustomTabPanel>
          ))}       
        </TableBody>
      </Table>
    </TableContainer>
  );
}
