"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Modal from "react-modal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [reportData, setReportData] = useState<SensorData[]>([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const router = useRouter();

  const fetchReport = async (type: "day" | "week") => {
    setLoadingReport(true);
    let endpoint = "";
    if (type === "day") endpoint = "http://localhost:8080/sensor/find/day";
    if (type === "week") endpoint = "http://localhost:8080/sensor/find/week";

    try {
      const response = await fetch(endpoint);
      const data: SensorData[] = await response.json();
      if (Array.isArray(data)) {
        setReportData(data);
      } else {
        console.error("El backend no devolvió un array.");
        setReportData([]);
      }
    } catch (error) {
      console.error("Error fetching report data:", error);
    }

    setLoadingReport(false);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    const isConfirmed = confirm("¿Estás seguro de cerrar sesión?");
    if (isConfirmed) {
      document.cookie =
        "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/");
    }
  };

  const handleExportExcel = (reportData: SensorData[]) => {
    if (reportData.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    // Mapear los datos para agregar formato
    const formattedData = reportData.map((item) => ({
      ID: item.id,
      "CO2 (ppm)": item.co2?.toLocaleString(),
      "Humedad Relativa (%)": item.humedad_relativa
        ? item.humedad_relativa + "%"
        : "N/A",
      PH1: item.ph1?.toFixed(2),
      PH2: item.ph2?.toFixed(2),
      "TDS1 (ppm)": item.tds1?.toLocaleString(),
      "TDS2 (ppm)": item.tds2?.toLocaleString(),
      "Temp Sensor 1 (°C)": item.tempSensor1?.toFixed(1),
      "Temp Sensor 2 (°C)": item.tempSensor2?.toFixed(1),
      "Temp Ambiente (°C)": item.temperatura_ambiente?.toFixed(1),
      "Fecha y Hora": new Date(item.timestamp)?.toLocaleString("es-PE"),
      Dispositivo: item.dispositivo,
    }));

    // Crear hoja de Excel
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Aplicar estilos a los encabezados
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // Blanco
      fill: { fgColor: { rgb: "4F81BD" } }, // Azul oscuro
      alignment: { horizontal: "center" },
    };

    // Obtener rango de las columnas
    const range = ws["!ref"]
      ? XLSX.utils.decode_range(ws["!ref"])
      : { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_col(C) + "1";
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = headerStyle;
    }

    // Ajustar anchos de columnas automáticamente
    ws["!cols"] = [
      { wch: 5 }, // ID
      { wch: 10 }, // CO2
      { wch: 15 }, // Humedad Relativa
      { wch: 8 }, // PH1
      { wch: 8 }, // PH2
      { wch: 12 }, // TDS1
      { wch: 12 }, // TDS2
      { wch: 15 }, // Temp Sensor 1
      { wch: 15 }, // Temp Sensor 2
      { wch: 15 }, // Temp Ambiente
      { wch: 20 }, // Fecha y Hora
      { wch: 15 }, // Dispositivo
    ];

    // Crear libro de Excel y agregar la hoja
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reporte de Sensores");

    // Generar archivo Excel
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
      cellStyles: true,
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, "reporte_sensores.xlsx");
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
          onClick={() => fetchReport("day")}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded shadow-lg hover:bg-green-600 transition w-full"
        >
          Reporte del Día
        </button>
        <button
          onClick={() => fetchReport("week")}
          className="mt-2 bg-orange-500 text-white px-4 py-2 rounded shadow-lg hover:bg-orange-600 transition w-full"
        >
          Reporte de la Semana
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
          <>
            <div className="overflow-x-auto overflow-y-auto max-h-96">
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
                      <td className="border p-2">{item.tempSensor1}</td>
                      <td className="border p-2">{item.tempSensor2}</td>
                      <td className="border p-2">
                        {item.temperatura_ambiente}
                      </td>
                      <td className="border p-2">
                        {new Date(item.timestamp)?.toLocaleTimeString()}
                      </td>
                      <td className="border p-2">{item.dispositivo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => handleExportExcel(reportData)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition w-full"
            >
              Exportar a Excel
            </button>
          </>
        )}
      </Modal>

      {/* Contenido dinámico */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
