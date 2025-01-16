"use client";

import { useRouter } from "next/navigation";

const dispositivos = [
  {
    id: "dispositivo_1",
    name: "Dispositivo 1",
  },
  {
    id: "dispositivo_2",
    name: "Dispositivo 2",
  },
  {
    id: "dispositivo_3",
    name: "Dispositivo 3",
  },
];

const Dashboard = () => {
  const router = useRouter();

  const handleSelectDevice = (device: string) => {
    router.push(`/dispositivo/${device}`);
  };

  const handleLogout = () => {
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition"
      >
        Cerrar Sesión
      </button>

      <h1 className="text-3xl font-bold mb-6 text-black/60">
        Selecciona un Dispositivo
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dispositivos.map((device) => (
          <button
            key={device.id}
            onClick={() => handleSelectDevice(device.id)}
            className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            {device.name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
