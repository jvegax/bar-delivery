import React from "react";
import Image from "next/image";
import useKiosko from "../hooks/useKiosko";
import Categoria from "./Categoria";

const Sidebar = () => {
  const { categories } = useKiosko();

  return (
    <>
      <Image width={300} height={100} src="/img/logo.svg" alt="logotipo" />
      <nav className="mt-10">
        {categories.map((cat) => (
          <Categoria categoria={cat} key={cat.id} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
