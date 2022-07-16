import React from "react";
import Image from "next/image";
import useKiosko from "../hooks/useKiosko";
import { formatMoney } from "../utils";

const Producto = ({ producto }) => {
  const { nombre, imagen, precio } = producto;
  const { handleSelectedProduct, handleSetModal } = useKiosko();

  return (
    <div className="border p-3">
      <Image alt={nombre} src={`/img/${imagen}.jpg`} width={400} height={500} />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatMoney(precio)}
        </p>
      </div>
      <button
        className="bg-indigo-500 rounded hover:bg-indigo-700 p-2 w-full uppercase text-white font-bold"
        onClick={() => {
            handleSetModal()
            handleSelectedProduct(producto)
        }}
      >
        Añadir
      </button>
    </div>
  );
};

export default Producto;
