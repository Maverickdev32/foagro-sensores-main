"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Co2Props {
  value: number; // Último valor de CO2
}

const Co2: React.FC<Co2Props> = ({ value }) => {
  const data = [{ name: "CO2", value }];

  // Función para determinar el color según el nivel de CO2
  const getColor = (co2: number): string => {
    if (co2 < 400) return "#82ca9d"; // Verde para niveles bajos
    if (co2 <= 1000) return "#ffc107"; // Amarillo para niveles moderados
    return "#ff4d4f"; // Rojo para niveles altos
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de CO2</h2>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart layout="vertical" data={data}>
          <XAxis
            type="number"
            domain={[0, 2000]} // Rango típico de CO2
            ticks={[0, 400, 800, 1200, 1600, 2000]} // Marcas clave
            tick={{ fontSize: 12 }}
            label={{
              value: "Nivel de CO2 (ppm)",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis type="category" dataKey="name" hide />
          <Bar dataKey="value" fill={getColor(value)} barSize={20}>
            <Cell key="bar" fill={getColor(value)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-lg font-semibold text-gray-700 mt-4">
        Co2: {value.toFixed(2)} ppm
      </p>
    </>
  );
};

export default Co2;
