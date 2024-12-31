"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TemperaturaProps {
  data: { timestamp: string; value: number }[];
}

export default function Temperatura({ data }: TemperaturaProps) {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Temperatura</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis
            dataKey="timestamp"
            label={{
              value: "Tiempo",
              position: "insideBottom",
              offset: -3,
            }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            label={{
              value: "Temperatura (°C)",
              angle: -90,
              position: "insideLeft",
              offset: 3,
              style: { textAnchor: "middle" },
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
