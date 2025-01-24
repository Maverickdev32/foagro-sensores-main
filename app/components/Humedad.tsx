"use client";

import { PieChart, Pie, Cell, Label } from "recharts";

interface HumedadProps {
  value?: number; // Último valor de humedad
}
const Humedad = ({ value }: HumedadProps) => {
  const data = [{ value: value ?? 0 }, { value: 100 - (value ?? 0) }];
  const getColor = (humedad: number): string => {
    if (humedad < 40) return "#0000FF"; // Azul para humedad baja
    if (humedad <= 70) return "#FFC0CB"; // Rosa para humedad moderada
    return "#800080"; // Púrpura para humedad alta
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Humedad</h2>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={100}
        >
          <Cell key="cell-0" fill={getColor(data[0].value)} />
          <Cell key="cell-1" fill="#ffffff" />
          <Label
            value={`${value?.toFixed(1)}%`}
            position="center"
            className="text-xl font-bold text-gray-800"
          />
        </Pie>
      </PieChart>
    </>
  );
};

export default Humedad;
