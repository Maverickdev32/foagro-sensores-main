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
  title: string;
}

export default function Tds({ data, title }: TdsProps) {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de {title}</h2>
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
            domain={[0, 500]} // Rango típico de TDS
            tick={{ fontSize: 12 }}
            label={{
              value: "TDS (µS/cm)",
              angle: -90,
              position: "insideLeft",
              offset: 6,
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            formatter={(value: number) => value.toFixed(2)}
            labelFormatter={(label: string) => `Hora: ${label}`}
          />
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
