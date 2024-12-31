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

interface ThermometerProps {
  temperature: number;
}

const Thermometer: React.FC<ThermometerProps> = ({ temperature }) => {
  const data = [{ name: "Temperatura", value: temperature }];

  const getColor = (temp: number): string => {
    if (temp < 18) return "#00c6ff";
    if (temp <= 37) return "#82ca9d";
    return "#ff4d4f";
  };

  return (
    <>
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Temperatura Ambiente
      </h2>
      <ResponsiveContainer width={120} height={200}>
        <BarChart data={data}>
          <YAxis
            type="number"
            domain={[0, 50]}
            ticks={[0, 20, 30, 40, 50]}
            width={40}
            label={{
              value: "°C",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />

          <XAxis type="category" dataKey="name" hide />

          <Bar dataKey="value" fill={getColor(temperature)} barSize={30}>
            <Cell key="bar" fill={getColor(temperature)} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-lg font-semibold text-gray-700 mt-4">
        {temperature.toFixed(1)}°C
      </p>
    </>
  );
};

const TemperaturaAmbiente: React.FC = () => {
  const [temperatura, setTemperatura] = useState<number>(25);

  useEffect(() => {
    const interval = setInterval(() => {
      const nuevaTemperatura = Math.random() * 50;
      setTemperatura(nuevaTemperatura);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return <Thermometer temperature={temperatura} />;
};

export default TemperaturaAmbiente;
