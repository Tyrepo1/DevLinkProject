import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Card, CardContent, Typography } from '@mui/material';

export default function LineDataset({ name, data, labels, colors, customization, key, min, max }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" color={"primary"}>
          {name}
        </Typography>
        <br />
        <LineChart
          xAxis={[
            {
              dataKey: 'day',
              valueFormatter: (v) => v.toString(),
              min: min,
              max: max,
            },
          ]}
          series={Object.keys(labels).map((key) => ({
            dataKey: key,
            label: labels[key],
            color: colors[key],
            showMark: false,
          }))}
          dataset={data}
          {...customization}
        />
      </CardContent>
    </Card>
  );
}
