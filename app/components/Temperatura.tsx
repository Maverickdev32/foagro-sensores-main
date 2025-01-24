"use client";

import { FaTemperatureHigh } from "react-icons/fa";
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
  title: string;
}

export default function Temperatura({ data, title }: TemperaturaProps) {
  const latestData = data.length > 0 ? data[data.length - 1] : { value: 0 };
  const getColor = (temp: number): string => {
    if (temp < 0) return "#00008B"; // Azul oscuro para muy frío
    if (temp < 10) return "#0000FF"; // Azul para frío
    if (temp < 18) return "#00c6ff"; // Azul claro para fresco
    if (temp < 25) return "#82ca9d"; // Verde para templado
    if (temp < 30) return "#FFD700"; // Amarillo para cálido
    if (temp < 37) return "#FFA500"; // Naranja para caliente
    return "#ff4d4f"; // Rojo para muy caliente
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        {title}
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
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-semibold text-gray-700 mt-4">
          {latestData.value?.toFixed(1)}°C
        </p>
        <div className="text-lg text-gray-500 mt-4">
          {" "}
          <FaTemperatureHigh fill={getColor(latestData.value)} />
        </div>
      </div>
    </>
  );
}
