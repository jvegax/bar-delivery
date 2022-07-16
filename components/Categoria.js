import React from "react";
import Image from "next/Image";
import useKiosko from "../hooks/useKiosko";

const Categoria = ({ categoria }) => {
  const { nombre, icono, id } = categoria;
  const { selectedCategory, handleSelectCategory } = useKiosko();
  const selected = id === selectedCategory?.id ? "bg-amber-400" : "";
  
  return (
    <div 
      className={`flex items-center gap-4 w-full border p-5 ${selected} hover:bg-amber-400`}
      onClick={() => handleSelectCategory(id)}  
    >
      <Image
        width={70}
        height={70}
        alt={`${nombre}-category`}
        src={`/img/icono_${icono}.svg`}
      />
      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer"
      >
        {nombre}
      </button>
    </div>
  );
};

export default Categoria;
