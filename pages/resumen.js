import ResumenProducto from "../components/ResumenProducto";
import useKiosko from "../hooks/useKiosko";
import Layout from "../layout/Layout";

export default function Resumen() {
  const { pedido } = useKiosko();
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen del pedido</h1>
      {pedido.length === 0 ? (
        <p className="mt-10 mb-10 text-2xl font-medium text-red-500">
          Añade productos al pedido para poder ver un resumen
        </p>
      ) : (
        <>
          <p className="mt-10 mb-10 text-2xl font-black">
            Revisa bien tu pedido antes de continuar
          </p>
          {pedido.map((p) => (
            <ResumenProducto key={p.id} producto={p} />
          ))}
        </>
      )}
    </Layout>
  );
}
