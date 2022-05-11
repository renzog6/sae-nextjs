import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import ProductoLayout from "../../components/productos/ProductoLayout";
import ProductoList from "../../components/productos/ProductoList";
import { useProductoContext } from "../../contexts/productoContext";
import { supabase } from "../../services/supabase";

const Productos = () => {
  const productoCtx = useProductoContext();

  if (productoCtx.loading)
    return (
      <ProductoLayout>
        <p className="text-2xl">Loading ...</p>
      </ProductoLayout>
    );
  //if (!items.length) return <p className="text-2xl">No posts.</p>;

  return (
    <>
      <ProductoLayout>
        <ProductoList items={productoCtx.productos} />
      </ProductoLayout>
    </>
  );
};

export default Productos;
