import { Container, Flex } from "@chakra-ui/react";

import DeliverList from "../../components/productos/DeliverList";
import DeliverOrder from "../../components/productos/DeliverOrder";
import ProductoLayout from "../../components/productos/ProductoLayout";

import { useProductoContext } from "../../contexts/productoContext";

export const Ver = () => {
  const productoCtx = useProductoContext();
  console.log(productoCtx);

  return (
    <ProductoLayout>
      <>
        <Container maxW={"100%"} p={0}>
          <Flex
            h={{ base: "auto", lg: "70vh" }}
            py={0}
            direction={{ base: "column", xl: "row" }}
          >
            <h1> VEr</h1>
          </Flex>
        </Container>
      </>
    </ProductoLayout>
  );
};

export default Ver;
