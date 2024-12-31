"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TdsProps {
  data: { timestamp: string; value: number }[];
}

export default function Tds({ data }: TdsProps) {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de TDS</h2>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            label={{
              value: "Tiempo",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            domain={[0, 2000]} // Rango típico de TDS
            tick={{ fontSize: 12 }}
            label={{
              value: "TDS (ppm)",
              angle: -90,
              position: "insideLeft",
              offset: 6,
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="rgba(136, 132, 216, 0.5)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
