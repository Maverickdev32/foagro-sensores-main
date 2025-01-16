"use client";

import { PieChart, Pie, Cell, Label } from "recharts";

interface HumedadProps {
  value: number; // Último valor de humedad
}
const Humedad = ({ value }: HumedadProps) => {
  const data = [{ value }, { value: 100 - value }];
  const COLORS = ["#00c6ff", "#e0e0e0"]; // Azul y gris

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Humedad Relativa</h2>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          dataKey="value"
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
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
