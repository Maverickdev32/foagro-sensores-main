"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Temperatura from "@/app/components/Temperatura";
import Modal from "react-modal";
import TemperaturaAmbiente from "@/app/components/TemperaturaAmbiente";
import Ph from "@/app/components/Ph";
import Co2 from "@/app/components/Co2";
import Tds from "@/app/components/Tds";
import Humedad from "@/app/components/Humedad";

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

const DispositivoPage = () => {
  const { nombre } = useParams();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportData, setReportData] = useState<SensorData[]>([]);
  const [loadingReport, setLoadingReport] = useState(false);

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

  const handleOpenReport = () => {
    setLoadingReport(true);
    setTimeout(() => {
      setReportData(sensorData.slice(-10));
      setLoadingReport(false);
      setIsModalOpen(true);
    }, 500);
  };
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
      <h1 className="text-3xl font-bold mb-4">{dispositivoNombre}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-lg p-4">
          <Temperatura
            data={[
              {
                timestamp: sensorData[sensorData.length - 1]?.timestamp,
                value: sensorData[sensorData.length - 1]?.tempSensor1,
              },
            ]}
            title="Temperatura 1"
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
            title="Temperatura 2"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Ph value={sensorData[sensorData.length - 1]?.ph1} title="Ph1" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Co2 value={sensorData[sensorData.length - 1]?.co2} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Ph value={sensorData[sensorData.length - 1]?.ph2} title="Ph2" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Tds
            data={[
              {
                timestamp: sensorData[sensorData.length - 1]?.timestamp,
                value: sensorData[sensorData.length - 1]?.tds1,
              },
            ]}
            title="TDS 1"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Humedad
            value={sensorData[sensorData.length - 1]?.humedad_relativa}
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
            title="TDS 2"
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleOpenReport}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Ver Reporte
        </button>

        <button
          onClick={() => window.history.back()}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Volver
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Últimos 10 Registros"
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
          Últimos 10 Registros - {dispositivoNombre}
        </h2>

        {loadingReport ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">CO2</th>
                  <th className="border p-2">Humedad Relativa</th>
                  <th className="border p-2">PH1</th>
                  <th className="border p-2">PH2</th>
                  <th className="border p-2">TDS1</th>
                  <th className="border p-2">TDS2</th>
                  <th className="border p-2">Temp Sensor 1</th>
                  <th className="border p-2">Temp Sensor 2</th>
                  <th className="border p-2">Temp Ambiente</th>
                  <th className="border p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item) => (
                  <tr key={item.id} className="text-center">
                    <td className="border p-2">{item.id}</td>
                    <td className="border p-2">{item.co2}</td>
                    <td className="border p-2">{item.humedad_relativa}</td>
                    <td className="border p-2">{item.ph1}</td>
                    <td className="border p-2">{item.ph2}</td>
                    <td className="border p-2">{item.tds1}</td>
                    <td className="border p-2">{item.tds2}</td>
                    <td className="border p-2">{item.tempSensor1}</td>
                    <td className="border p-2">{item.tempSensor2}</td>
                    <td className="border p-2">{item.temperatura_ambiente}</td>
                    <td className="border p-2">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DispositivoPage;
