"use client";

import { PieChart, Pie, Cell, Label } from "recharts";

const Humedad = () => {
  const humedad = 67.6;
  const data = [{ value: humedad }, { value: 100 - humedad }];

  const COLORS = ["#00c6ff", "#e0e0e0"];

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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}

          <Label
            value={`${humedad}%`}
            position="center"
            className="text-xl font-bold text-gray-800"
          />
        </Pie>
      </PieChart>
    </>
  );
};

export default Humedad;
