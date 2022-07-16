import Image from "next/image";
import useKiosko from "../hooks/useKiosko";
import { formatMoney } from "../utils";
import { useState, useEffect } from "react";

const CustomModal = () => {
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  const { selectedProduct, handleSetModal, handleSetPedido, pedido } =
    useKiosko();
  const { nombre, imagen, precio, id } = selectedProduct;

  useEffect(() => {
    if (pedido.some((p) => p.id === selectedProduct.id)) {
      const cantidadState = pedido.find(
        (p) => p.id === selectedProduct.id
      ).cantidad;
      setEdicion(true);
      setCantidad(cantidadState);
    } else {
      setEdicion(false);
    }
  }, [pedido, selectedProduct, handleSetModal]);

  const addProduct = () => {
    if (cantidad === 10) return;
    setCantidad(cantidad + 1);
  };

  const subtractProduct = () => {
    if (cantidad === 1) return;
    setCantidad(cantidad - 1);
  };

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          alt="imagen"
          width={300}
          height={400}
          src={`/img/${imagen}.jpg`}
        />
      </div>
      <div className="md:w-2/3">
        <div clasName="flex justify-end">
          <button onClick={handleSetModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-5">{nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatMoney(precio)}
        </p>
        <div className="flex gap-4 mt-5">
          <button onClick={() => subtractProduct(cantidad)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-2xl font-bold">{cantidad}</p>
          <button onClick={() => addProduct(cantidad)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <button
          onClick={() => {
            const newPedido = { id, cantidad, precio, nombre };
            handleSetPedido(newPedido);
            handleSetModal();
          }}
          className="bg-indigo-500 hover:bg-indigo-700 rounded text-md mt-4 uppercase font-bold text-white p-2 "
        >
          {edicion ? "Guardar cambios" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
