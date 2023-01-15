import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const defaultData = [
  {
    name: `Low P/E (${7})`,
    "10% growth": 8.34,
    "5% growth": 3.42,
  },
  {
    name: `High P/E (${24})`,
    "10% growth": 23.77,
    "5% growth": 18.14,
  },
  {
    name: `Avg P/E (${15})`,
    "10% growth": 16.12,
    "5% growth": 10.84,
  },
];

const ValuationProbabilities = ({ data = defaultData }) => (
  <article>
    <div>DOW Inc</div>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="10% growth"
        stroke="#8884d8"
        strokeDasharray="5 5"
      />
      <Line
        type="monotone"
        dataKey="5% growth"
        stroke="#82ca9d"
        strokeDasharray="3 4 5 2"
      />
    </LineChart>
  </article>
);

export default ValuationProbabilities;
