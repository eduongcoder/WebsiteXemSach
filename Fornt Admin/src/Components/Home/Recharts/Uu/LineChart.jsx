import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Page A', uv: 400, pv: 2400 },
  { name: 'Page B', uv: 300, pv: 4567 },
  { name: 'Page C', uv: 200, pv: 1398 },
];
//đường
function MyLineChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

export default MyLineChart;




