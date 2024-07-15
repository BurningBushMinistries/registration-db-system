import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Visitors',
    type: 'column',
    data: [0, 11, 0, 0, 13, 22, 0, 0, 0, 0, 0]
  },
  {
    name: 'Attendance',
    type: 'area',
    data: [0, 55, 0, 0, 22, 43, 0, 0, 0, 0, 0]
  },
  {
    name: 'Souls',
    type: 'line',
    data: [0, 25, 0, 0, 45, 35, 64, 0, 0, 0, 0]
  }
];

export default function AppWebsiteVisits({ StatsList = [] }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2023',
      '02/01/2023',
      '03/01/2023',
      '04/01/2023',
      '05/01/2023',
      '06/01/2023',
      '07/01/2023',
      '08/01/2023',
      '09/01/2023',
      '10/01/2023',
      '11/01/2023'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} people`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Total Visitors" subheader="Latest 11 months" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
