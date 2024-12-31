"use client";
import Humedad from "../components/Humedad";
import Temperatura from "../components/Temperatura";
import Link from "next/link";
import TemperaturaAmbiente from "../components/TemperaturaAmbiente";
import Ph from "../components/Ph";
import Co2 from "../components/Co2";
import Tds from "../components/Tds";
import { useEffect, useState } from "react";

interface SensorData {
  id: number;
  temperatura_ambiente: number;
  humedad_relativa: number;
  tempSensor1: number;
  tempSensor2: number;
  co2: number;
  tds1: number;
  tds2: number;
  ph1: number;
  ph2: number;
  dispositivo: string;
  mq2_estado: string;
  timestamp: string;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const generateRandomData = () => {
    const now = new Date();
    const timestamp = new Date(
      now.getTime() - Math.random() * 5 * 60 * 60 * 1000
    ).toISOString();
    return {
      id: Math.floor(Math.random() * 1000),
      temperatura_ambiente: parseFloat((Math.random() * 50).toFixed(1)), // 0-50 grados
      humedad_relativa: parseFloat((Math.random() * 100).toFixed(1)), // 0-100%
      tempSensor1: parseFloat((Math.random() * 100 - 50).toFixed(1)), // -50 a 50 grados
      tempSensor2: parseFloat((Math.random() * 100 - 50).toFixed(1)), // -50 a 50 grados
      co2: parseFloat((Math.random() * 2000).toFixed(1)), // 0-2000 ppm
      tds1: parseFloat((Math.random() * 2000).toFixed(1)), // 0-2000 ppm
      tds2: parseFloat((Math.random() * 2000).toFixed(1)), // 0-2000 ppm
      ph1: parseFloat((Math.random() * 14).toFixed(1)), // 0-14 pH
      ph2: parseFloat((Math.random() * 14).toFixed(1)), // 0-14 pH
      dispositivo: `dispositivo_${Math.floor(Math.random() * 10) + 1}`,
      mq2_estado: Math.random() > 0.5 ? "ON" : "OFF",
      timestamp,
    };
  };
  useEffect(() => {
    // Generar datos iniciales
    const initialData = Array.from({ length: 100 }, () => generateRandomData()); // 3600 puntos para 5 horas (1 cada 5 segundos)
    setSensorData(initialData);

    // Actualizar datos cada 5 segundos
    const interval = setInterval(() => {
      setSensorData((prevData) => {
        const newData = [...prevData.slice(1), generateRandomData()]; // Eliminar el primero, agregar uno nuevo
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/sensor/find/all");
  //       const data = await response.json();
  //       setSensorData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();

  //   const interval = setInterval(fetchData, 5000);

  //   return () => clearInterval(interval); // Limpia el intervalo al desmontar
  // }, []);
  const temperaturaData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.temperatura_ambiente,
  }));
  console.log(temperaturaData);

  const humedadData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.humedad_relativa,
  }));

  const co2Data = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.co2,
  }));

  const tdsData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.tds1,
  }));

  const phData = sensorData.map((item) => ({
    timestamp: new Date(item.timestamp).toLocaleTimeString(),
    value: item.ph1,
  }));

  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col items-center">
      <Link
        href={"/"}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg"
      >
        Cerrar Sesión
      </Link>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full max-w-screen-xl mb-8">
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Temperatura data={temperaturaData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Ph />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Co2 />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Humedad />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <TemperaturaAmbiente />
        </div>
        <div className="bg-white shadow-md rounded-lg p-1 flex flex-col items-center justify-center h-72">
          <Tds />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
