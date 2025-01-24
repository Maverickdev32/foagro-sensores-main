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
  const [humedadAll, setHumedadAll] = useState<SensorData[]>([]);
  const [humedadSueloAll, setHumedadSueloAll] = useState<SensorData[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/sensor/find/dispositivo_1`
        );
        const data: SensorData[] = await response.json();

        if (Array.isArray(data)) {
          setHumedadAll(data);
        } else {
          console.error("El backend no devolvió un array.");
          setHumedadAll([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/sensor/find/dispositivo_4`
        );
        const data: SensorData[] = await response.json();

        if (Array.isArray(data)) {
          setHumedadSueloAll(data);
        } else {
          console.error("El backend no devolvió un array.");
          setHumedadSueloAll([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex flex-row items-start justify-between w-full xl:max-w-7xl 2xl:max-w-[90%]">
        <div className="flex flex-col flex-grow items-center w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {dispositivoNombre}
          </h1>

          {/* Sensores de Ambiente */}
          <fieldset className="border-2 border-green-500 shadow-md rounded-lg p-6 w-full">
            <legend className="text-lg font-semibold text-green-500 px-4 uppercase">
              Sensores de Ambiente
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <TemperaturaAmbiente
                  temperature={
                    sensorData[sensorData.length - 1]?.temperatura_ambiente
                  }
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Co2 value={humedadAll[humedadAll.length - 1]?.co2} />
              </div>
              {/* Valor del co2 del dispositivo uno en todos los graficos */}

              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                <Humedad
                  name="Humedad"
                  value={humedadAll[humedadAll.length - 1]?.humedad_relativa}
                />
              </div>

              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/izquierda.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
            </div>
          </fieldset>

          {/* Sensores de Suelo */}
          <fieldset className="border-2 border-green-500 shadow-md rounded-lg p-6 w-full mt-6">
            <legend className="text-lg font-semibold text-green-500 px-4 uppercase">
              Sensores de Suelo
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/TEMP_IZQUIERDA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Temperatura
                  data={[
                    {
                      timestamp: sensorData[sensorData.length - 1]?.timestamp,
                      value: sensorData[sensorData.length - 1]?.tempSensor1,
                    },
                  ]}
                  title="Temperatura Suelo Izquierda"
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
                  title="Temperatura Suelo Derecha"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/TEMP_DERECHA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/PH_IZQUIERDA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Ph
                  value={sensorData[sensorData.length - 1]?.ph1}
                  title="Ph Izquierdo"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Ph
                  value={sensorData[sensorData.length - 1]?.ph2}
                  title="Ph Derecho"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/PH_DERECHA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/TDS_DERECHA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Tds
                  data={[
                    {
                      timestamp: sensorData[sensorData.length - 1]?.timestamp,
                      value: sensorData[sensorData.length - 1]?.tds1,
                    },
                  ]}
                  title="us/cm Izquierdo"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Tds
                  data={[
                    {
                      timestamp: sensorData[sensorData.length - 1]?.timestamp,
                      value: sensorData[sensorData.length - 1]?.tds2,
                    },
                  ]}
                  title="us/cm Derecho"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <Image
                  src="/TDS_IZQUIERDA.png"
                  alt="logo"
                  width={250}
                  height={250}
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-center items-center">
                <Humedad
                  name="Humedad del suelo"
                  value={humedadSueloAll[humedadSueloAll.length - 1]?.humedad}
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
export default DispositivoPage;
