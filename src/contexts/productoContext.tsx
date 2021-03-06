import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { ProductoRetiro } from "../interfaces/producto_retiro";

const ProductoContext = createContext(null);

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [deliverList, setDeliverList] = useState([]);
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
    setLoading(true);
    let { data: todos, error } = await supabase
      .from("productos")
      .select("*")
      .order("nombre", { ascending: true });
    if (error) console.log("error", error);
    else {
      setProductos(todos);
      setLoading(false);
    }
  }

  /*
  useEffect(() => {
    const fetchTodos = async () => {
      let { data: todos, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre", { ascending: false });
      if (error) console.log("error", error);
      else setProductos(todos);
    };
    fetchTodos();
  }, []);

    async function fetchAll() {
    const { data, error } = await supabase.from("productos").select();
    setProductos(data);
    setLoading(false);
  }
 */
  function addToDeliverList(data: any) {
    try {
      if (!deliverList.includes(data)) {
        setDeliverList(deliverList.concat(data));
      } else {
        console.log("ERROR::::");
      }
    } catch (error) {
      console.log("productoContext: ", error);
    }
  }

  function updateDeliver(fecha, responsable) {
    try {
      console.log("updateDeliver: " + fecha + " - " + responsable);
      const deliver: ProductoRetiro = {};
      deliver.fecha = fecha;
      deliver.responsable = responsable;

      if (deliverList) {
        deliverList.forEach((v) => {
          const find = productos.find((x) => x.id === v.id);
          updateStock(v.id, find.stock - v.stock);
        });
      }
    } catch (error) {
      console.log("Error > updateDeliver: " + error);
    }
  }

  const updateStock = async (id, cantidad) => {
    try {
      console.log("updateStock::: " + id + " - " + cantidad);

      const { data, error } = await supabase
        .from("productos")
        .update({ stock: cantidad })
        .eq("id", id);

      if (error) console.log(error.message);
      else console.log("TODO OK");
    } catch (error) {
      console.log("Error > updateStock: " + error);
    }
  };

  const saveDeliver = async (mv) => {
    console.log("saveDeliver: ", mv);
    let d = JSON.stringify(mv);
    console.log(d);
    const { data, error } = await supabase.from("productos").insert([
      {
        nombre: mv.nombre,
        tipo: mv.tipo,
        stock: mv.stock,
        info: mv.info,
      },
    ]);
    if (error) console.log(error.message);
    else console.log("TODO OK");
  };

  const resetDeliver = () => {
    setDeliverList([]);
  };

  const value = {
    productos,
    deliverList,
    setDeliverList,
    addToDeliverList,
    updateDeliver,
    resetDeliver,
  };

  return (
    <>
      <ProductoContext.Provider value={value}>
        {children}
      </ProductoContext.Provider>
    </>
  );
};

export const useProductoContext = () => useContext(ProductoContext);
