import { useRouter } from "next/router";
import useKiosko from "../hooks/useKiosko";

const pasos = [
  { id: 1, nombre: "Menu", url: "/" },
  { id: 2, nombre: "Resumen", url: "/resumen" },
  { id: 3, nombre: "Datos y total", url: "/total" },
];

const Pasos = () => {
  const { paso, handleChangePaso } = useKiosko();
  const router = useRouter();

  const calculaProgreso = () => {
    const res = (paso / 3) * 100;
    return res;
  };

  return (
    <>
      <div className="flex justify-between">
        {pasos.map((paso) => (
          <button
            onClick={() => {
              router.push(paso.url);
              handleChangePaso(paso.id);
            }}
            className="text-3xl font-bold mb-5"
            key={paso.id}
          >
            {paso.nombre}
          </button>
        ))}
      </div>
      <div className="w-full bg-gray-600 rounded-full h-2.5 dark:bg-gray-300 mb-10">
        <div
          className="bg-amber-600 h-2.5 rounded-full"
          style={{ width: `${calculaProgreso()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Pasos;
