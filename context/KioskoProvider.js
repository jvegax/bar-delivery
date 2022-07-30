import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const KioskoContext = createContext();

const KioskoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [paso, setPaso] = useState(1);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [ordenes, setOrdenes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    getCategories();
    getOrders();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const colocarOrden = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      setSelectedCategory(categories[0]);
      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Pedido realizado correctamente! 🎉");

      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrders = async () => {
    const { data } = await axios("/api/ordenes");
    const orders = data.map((order) => {
      return { ...order, completado: false };
    });
    setOrdenes(orders);
  };

  const getCategories = async () => {
    const { data } = await axios("/api/categorias");
    setCategories(data);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActulizar = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActulizar);
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setSelectedProduct(productoActualizar[0]);
    setModal(!modal);
  };

  const handleChangePaso = (pasoId) => {
    setPaso(pasoId);
  };
  const handleSelectCategory = (id) => {
    const category = categories.filter((cat) => cat.id === id);
    setSelectedCategory(category[0]);
    router.push("/");
  };

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSetModal = () => {
    setSelectedProduct({});
    setModal(!modal);
  };

  const handleToastSuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSetPedido = (nuevoPedido) => {
    if (pedido.some((productoPedido) => productoPedido.id === nuevoPedido.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === nuevoPedido.id ? nuevoPedido : pedidoState
      );
      setPedido(pedidoActualizado);
      handleToastSuccess("Producto actualizado!");
    } else {
      setPedido([...pedido, nuevoPedido]);
      handleToastSuccess("Producto añadido!");
    }
  };

  return (
    <KioskoContext.Provider
      value={{
        categories,
        selectedCategory,
        handleSelectCategory,
        selectedProduct,
        handleSelectedProduct,
        modal,
        handleSetModal,
        pedido,
        handleSetPedido,
        paso,
        handleChangePaso,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        total,
        colocarOrden,
        ordenes,
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
};

export { KioskoProvider };
export default KioskoContext;
