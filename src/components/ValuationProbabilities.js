import React, { useState, useEffect } from "react";
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
    "base% growth": 8.34,
    "halved% growth": 3.42,
  },
  {
    name: `High P/E (${24})`,
    "base% growth": 23.77,
    "halved% growth": 18.14,
  },
  {
    name: `Avg P/E (${15})`,
    "base% growth": 16.12,
    "halved% growth": 10.84,
  },
];

const ValuationProbabilities = ({ data, chartClass = "" }) => {
  const [metrics, setMetrics] = useState(data);

  useEffect(() => {
    setMetrics(data);
  }, [data]);

  return (
    <article className={chartClass}>
      <LineChart
        width={500}
        height={300}
        data={metrics.length ? metrics : defaultData}
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
          dataKey="base% growth"
          stroke="#8884d8"
          strokeDasharray="5 5"
        />
        <Line
          type="monotone"
          dataKey="halved% growth"
          stroke="#82ca9d"
          strokeDasharray="3 4 5 2"
        />
      </LineChart>
    </article>
  );
};

export default ValuationProbabilities;
