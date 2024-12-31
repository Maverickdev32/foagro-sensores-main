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

interface Co2Props {
  co2: number;
}

const Co2Chart: React.FC<Co2Props> = ({ co2 }) => {
  const data = [{ name: "CO2", value: co2 }];

  // Función para determinar el color según el nivel de CO2
  const getColor = (co2: number): string => {
    if (co2 < 400) return "#82ca9d"; // Verde para niveles bajos
    if (co2 <= 1000) return "#ffc107"; // Amarillo para niveles moderados
    return "#ff4d4f"; // Rojo para niveles altos
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de CO2</h2>
      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={100}>
        <BarChart layout="vertical" data={data}>
          {/* Eje X: Escala de CO2 */}
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
          {/* Eje Y oculto */}
          <YAxis type="category" dataKey="name" hide />
          {/* Barra de CO2 */}
          <Bar dataKey="value" fill={getColor(co2)} barSize={20}>
            <Cell key="bar" fill={getColor(co2)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Valor de CO2 */}
      <p className="text-lg font-semibold text-gray-700 mt-4">{co2} ppm</p>
    </>
  );
};

const Co2: React.FC = () => {
  const [co2, setCo2] = useState<number>(400); // Valor inicial de CO2

  useEffect(() => {
    // Simula una solicitud a una API cada 5 segundos
    const interval = setInterval(() => {
      const nuevoCo2 = Math.floor(Math.random() * 2000); // Genera un valor aleatorio entre 0 y 2000
      setCo2(nuevoCo2); // Actualiza el estado con el nuevo valor de CO2
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return <Co2Chart co2={co2} />;
};

export default Co2;
