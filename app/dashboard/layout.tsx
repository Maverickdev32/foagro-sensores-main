"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";

const dispositivos = [
  { id: "dispositivo_1", name: "Dispositivo 1" },
  { id: "dispositivo_2", name: "Dispositivo 2" },
  { id: "dispositivo_3", name: "Dispositivo 3" },
];
interface SensorData {
  id: number;
  temperatura_ambiente: number;
  humedad: number;
  humedad_relativa?: number;
  temp_sensor1: number;
  temp_sensor2: number;
  co2: number;
  tds1: number;
  tds2: number;
  ph1: number;
  ph2: number;
  dispositivo: string;
  mq2: number;
  timestamp: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  const [reportData, setReportData] = useState<SensorData[]>([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/sensor/find/all`);
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
  }, []);

  const handleOpenReport = () => {
    setLoadingReport(true);
    setTimeout(() => {
      setReportData(sensorData.slice(-10));
      setLoadingReport(false);
      setIsModalOpen(true);
    }, 500);
  };

  const handleLogout = () => {
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Barra lateral con dispositivos */}
      <aside className="w-1/4 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Dispositivos</h2>
        <nav className="flex flex-col gap-4">
          {dispositivos.map((device) => (
            <Link
              key={device.id}
              href={`/dashboard/dispositivo/${device.id}`}
              className="block bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition"
            >
              {device.name}
            </Link>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition w-full"
        >
          Cerrar Sesión
        </button>
        <button
          onClick={handleOpenReport}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition w-full"
        >
          Reporte Últimos 10 Registros
        </button>
      </aside>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Últimos 10 Registros"
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Últimos 10 Registros</h2>

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
                  <th className="border p-2">Dispositivo</th>
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
                    <td className="border p-2">{item.temp_sensor1}</td>
                    <td className="border p-2">{item.temp_sensor2}</td>
                    <td className="border p-2">{item.temperatura_ambiente}</td>
                    <td className="border p-2">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="border p-2">{item.dispositivo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>

      {/* Contenido dinámico */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
