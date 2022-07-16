import Producto from "../components/Producto";
import useKiosko from "../hooks/useKiosko";
import Layout from "../layout/Layout";

export default function Home() {
  const { selectedCategory } = useKiosko();

  const renderProductos = () => {
    return selectedCategory?.productos?.map((producto) => (
      <Producto key={producto.id} producto={producto} />
    ));
  };

  return (
    <Layout pagina={selectedCategory?.nombre}>
      <h1 className="text-4xl font-black">{selectedCategory?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {renderProductos()}
      </div>
    </Layout>
  );
}
