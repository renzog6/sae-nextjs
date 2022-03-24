import Head from "next/head";
import { ProductoLayout } from "components/productos";

const Productos = () => {
  return (
    <ProductoLayout>
      <Head>
        <title>SAE - Productos</title>
      </Head>
    </ProductoLayout>
  );
};

export default Productos;
