import axios from "axios";
import { useState, useEffect, createContext } from "react";

const KioskoContext = createContext();

const KioskoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const getCategories = async () => {
    const { data } = await axios("/api/categorias");
    setCategories(data);
  };

  const handleSelectCategory = (id) => {
    const category = categories.filter((cat) => cat.id === id);
    setSelectedCategory(category[0]);
  };

  const handleSelectedProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSetModal = () => {
    setSelectedProduct({});
    setModal(!modal);
  };

  const handleSetPedido = (nuevoPedido) => {
    if (pedido.some((productoPedido) => productoPedido.id === nuevoPedido.id)) {
      const pedidoActualizado = pedido.map((pedidoState) =>
        pedidoState.id === nuevoPedido.id ? nuevoPedido : pedidoState
      );
      setPedido(pedidoActualizado);
    } else {
      setPedido([...pedido, nuevoPedido]);
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
      }}
    >
      {children}
    </KioskoContext.Provider>
  );
};

export { KioskoProvider };
export default KioskoContext;
