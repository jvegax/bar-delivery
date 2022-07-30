import React from "react";

const Orden = ({ pedido }) => {
  return pedido.orden.map((product) => {
    return (
      <div key={pedido.fecha}>
        <p className="font-bold text-xl">
          (x{pedido.orden[0].cantidad}) {pedido.orden[0].nombre}
        </p>
      </div>
    );
  });
};
export default Orden;
