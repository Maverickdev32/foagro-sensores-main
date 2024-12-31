"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TdsData {
  timestamp: string;
  value: number;
}

const TdsChart: React.FC<{ data: TdsData[] }> = ({ data }) => {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Nivel de TDS</h2>
      {/* Gráfico de Área */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 12 }}
            label={{ value: "Tiempo", position: "insideBottom", offset: -5 }}
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
};

const Tds: React.FC = () => {
  const [data, setData] = useState<TdsData[]>([]);

  useEffect(() => {
    // Función para generar datos de TDS
    const generateData = () => {
      const timestamp = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const value = Math.floor(Math.random() * 2000); // Genera un valor entre 0 y 2000 ppm
      setData((prevData) => {
        const newData = [...prevData, { timestamp, value }];
        return newData.slice(-10); // Mantiene solo los últimos 10 registros
      });
    };

    // Genera un dato inicial y configura un intervalo para actualizar cada 5 segundos
    generateData();
    const interval = setInterval(generateData, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return <TdsChart data={data} />;
};

export default Tds;
