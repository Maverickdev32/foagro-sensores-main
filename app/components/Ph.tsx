"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PhProps {
  value: number;
  title: string;
}

const Ph: React.FC<PhProps> = ({ value, title }) => {
  const data = [{ name: "pH", value }];

  // Función para determinar el color según el pH
  const getColor = (ph: number): string => {
    if (ph < 3) return "#8B0000"; // Rojo oscuro para muy ácido
    if (ph < 5) return "#ff4d4f"; // Rojo para ácido
    if (ph < 7) return "#FFA500"; // Naranja para ligeramente ácido
    if (ph === 7) return "#82ca9d"; // Verde para neutral
    if (ph <= 9) return "#ADD8E6"; // Azul claro para ligeramente básico
    if (ph <= 11) return "#007bff"; // Azul para básico
    return "#00008B"; // Azul oscuro para muy básico
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de {title}</h2>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart layout="vertical" data={data}>
          <XAxis
            type="number"
            domain={[0, 14]} // Escala de pH de 0 a 14
            ticks={[0, 2, 4, 6, 7, 8, 10, 12, 14]}
            tick={{ fontSize: 12 }}
            label={{
              value: "Escala de pH",
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
        pH: {value?.toFixed(1)}
      </p>
    </>
  );
};

export default Ph;
