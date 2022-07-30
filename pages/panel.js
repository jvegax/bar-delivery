import React from "react";
import Orden from "../components/Orden";
import useKiosko from "../hooks/useKiosko";
import Layout from "../layout/Layout";
import { formatMoney } from "../utils";

const Panel = () => {
  const { ordenes } = useKiosko();
  console.log(ordenes);

  const renderOrders = () => {
    return ordenes?.map((orden) => {
      return (
        <div key={orden.fecha} className="bg-amber-300 mb-4 p-3 rounded ">
          <p className="text-lg font-bold">Cliente: {orden.nombre}</p>
          <Orden key={orden.fecha} pedido={orden} />
          <div className="mt-4">
            Total:{" "}
            <span className="font-bold text-xl">
              {formatMoney(orden.total)}
            </span>
          </div>
        </div>
      );
    });
  };
  return (
    <Layout pagina="Panel">
      <h1 className="text-2xl font-black mb-4">Listado de ordenes</h1>
      {renderOrders()}
    </Layout>
  );
};

export default Panel;
