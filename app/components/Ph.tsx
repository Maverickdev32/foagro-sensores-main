"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PhProps {
  ph: number;
}

const PhChart: React.FC<PhProps> = ({ ph }) => {
  const data = [{ name: "pH", value: ph }];

  // Función para determinar el color según el pH
  const getColor = (ph: number): string => {
    if (ph < 7) return "#ff4d4f"; // Rojo para ácido
    if (ph === 7) return "#82ca9d"; // Verde para neutral
    return "#007bff"; // Azul para básico
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de pH</h2>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart layout="vertical" data={data}>
          {/* Eje X: Escala de pH */}
          <XAxis
            type="number"
            domain={[0, 14]} // Escala de pH de 0 a 14
            ticks={[0, 2, 4, 6, 7, 8, 10, 12, 14]} // Marcas importantes
            tick={{ fontSize: 12 }}
            label={{
              value: "Escala de pH",
              position: "insideBottom",
              offset: -5,
            }}
          />
          {/* Eje Y oculto */}
          <YAxis type="category" dataKey="name" hide />
          {/* Barra de pH */}
          <Bar dataKey="value" fill={getColor(ph)} barSize={20}>
            <Cell key="bar" fill={getColor(ph)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Valor de pH */}
      <p className="text-lg font-semibold text-gray-700 mt-4">
        pH: {ph.toFixed(1)}
      </p>
    </>
  );
};

const Ph: React.FC = () => {
  const [ph, setPh] = useState<number>(7); // Valor inicial de pH

  useEffect(() => {
    // Simula una solicitud a una API cada 5 segundos
    const interval = setInterval(() => {
      const nuevoPh = parseFloat((Math.random() * 14).toFixed(1)); // Genera un valor aleatorio entre 0 y 14
      setPh(nuevoPh); // Actualiza el estado con el nuevo valor de pH
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return <PhChart ph={ph} />;
};

export default Ph;
