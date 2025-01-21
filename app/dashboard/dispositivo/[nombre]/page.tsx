"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Temperatura from "@/app/components/Temperatura";
import TemperaturaAmbiente from "@/app/components/TemperaturaAmbiente";
import Ph from "@/app/components/Ph";
import Co2 from "@/app/components/Co2";
import Tds from "@/app/components/Tds";
import Humedad from "@/app/components/Humedad";
import Image from "next/image";

interface SensorData {
  id: number;
  temperatura_ambiente: number;
  humedad: number;
  humedad_relativa?: number;
  tempSensor1: number;
  tempSensor2: number;
  co2: number;
  tds1: number;
  tds2: number;
  ph1: number;
  ph2: number;
  dispositivo: string;
  mq2: number;
  timestamp: string;
}

const DispositivoPage = () => {
  const { nombre } = useParams();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/sensor/find/${nombre}`
        );
        const data: SensorData[] = await response.json();

        if (Array.isArray(data)) {
          setSensorData(data);
        } else {
          console.error("El backend no devolvió un array.");
          setSensorData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [nombre]);

  if (!sensorData)
    return <p className="text-center mt-10">Cargando datos...</p>;

  let dispositivoNombre = "Desconocido";
  if (nombre === "dispositivo_1") {
    dispositivoNombre = "Dispositivo 1";
  } else if (nombre === "dispositivo_2") {
    dispositivoNombre = "Dispositivo 2";
  } else if (nombre === "dispositivo_3") {
    dispositivoNombre = "Dispositivo 3";
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="flex flex-row items-start justify-between w-full max-w-6xl">
        <div className="w-[150px] h-[150px] flex-shrink-0 mt-36">
          <Image src="/izquierda.png" alt="logo" width={250} height={250} />
        </div>

        <div className="flex flex-col flex-grow items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {dispositivoNombre}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Temperatura
                data={[
                  {
                    timestamp: sensorData[sensorData.length - 1]?.timestamp,
                    value: sensorData[sensorData.length - 1]?.tempSensor1,
                  },
                ]}
                title="Temperatura Suelo"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <TemperaturaAmbiente
                temperature={
                  sensorData[sensorData.length - 1]?.temperatura_ambiente
                }
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Temperatura
                data={[
                  {
                    timestamp: sensorData[sensorData.length - 1]?.timestamp,
                    value: sensorData[sensorData.length - 1]?.tempSensor2,
                  },
                ]}
                title="Temperatura Suelo"
              />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Ph value={sensorData[sensorData.length - 1]?.ph1} title="Ph" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Co2 value={sensorData[sensorData.length - 1]?.mq2} />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 ">
              <Ph value={sensorData[sensorData.length - 1]?.ph2} title="Ph" />
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              <Tds
                data={[
                  {
                    timestamp: sensorData[sensorData.length - 1]?.timestamp,
                    value: sensorData[sensorData.length - 1]?.tds1,
                  },
                ]}
                title="us/cm"
              />
            </div>
            {nombre !== "dispositivo_3" && (
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                <Humedad
                  value={sensorData[sensorData.length - 1]?.humedad_relativa}
                />
              </div>
            )}
            <div className="bg-white shadow-md rounded-lg p-4">
              <Tds
                data={[
                  {
                    timestamp: sensorData[sensorData.length - 1]?.timestamp,
                    value: sensorData[sensorData.length - 1]?.tds2,
                  },
                ]}
                title="us/cm"
              />
            </div>
          </div>
        </div>
        <div className="w-[150px] h-[150px] flex-shrink-0 mt-36">
          <Image
            className="left"
            src="/derecha.png"
            alt="logo"
            width={250}
            height={250}
          />
        </div>
      </div>
    </div>
  );
};

export default DispositivoPage;
