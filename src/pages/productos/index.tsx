import { useState, useEffect } from "react";
import ProductoLayout from "../../components/productos/ProductoLayout";
import ProductoList from "../../components/productos/ProductoList";
import { useProductoContext } from "../../contexts/productoContext";
import { supabase } from "../../services/supabase";

const Productos = () => {
  const productoCtx = useProductoContext();

  /*   const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
    const productos = supabase
      .from("productos")
      .on("*", () => {
        fetchAll();
      })
      .subscribe();
  }, []);

  async function fetchAll() {
    const { data, error } = await supabase.from("productos").select();
    setItems(data);
    setLoading(false);
  } */

  if (productoCtx.loading)
    return (
      <ProductoLayout>
        <p className="text-2xl">Loading ...</p>
      </ProductoLayout>
    );
  //if (!items.length) return <p className="text-2xl">No posts.</p>;

  return (
    <ProductoLayout>
      <ProductoList items={productoCtx.productos} />
    </ProductoLayout>
  );
};

export default Productos;
