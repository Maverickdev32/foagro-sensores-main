"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { timestamp: "22:28", temperature: 13.81 },
  { timestamp: "22:29", temperature: 12.75 },
  { timestamp: "10:30", temperature: 24.37 },
];

interface TemperaturaProps {
  data: { timestamp: string; value: number }[];
}

export default function Temperatura({ data }: TemperaturaProps) {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Temperatura Últimas 5 Horas
      </h2>
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
