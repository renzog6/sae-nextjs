import { Container, Flex, useDisclosure } from "@chakra-ui/react";

import DeliverList from "../../components/productos/DeliverList";
import DeliverOrder from "../../components/productos/DeliverOrder";
import ProductoLayout from "../../components/productos/ProductoLayout";

import { useProductoContext } from "../../contexts/productoContext";

export const ProductDeliver = () => {
  console.log("ProductDeliver");
  const productoCtx = useProductoContext();
  const {
    isOpen: isOpenX,
    onOpen: onOpenX,
    onClose: onCloseX,
  } = useDisclosure();

  return (
    <ProductoLayout>
      <>
        <Container maxW={"100%"} p={0}>
          <Flex
            h={{ base: "auto",  lg: "70vh" }}
            py={0}
            direction={{ base: "column", xl: "row" }}
          >
            <DeliverList
              items={productoCtx.productos}
              isOpenX={isOpenX}
              onOpenX={onOpenX}
              onCloseX={onCloseX}
            />
            <DeliverOrder items={productoCtx.deliverList} />
          </Flex>
        </Container>
      </>
    </ProductoLayout>
  );
};

export default ProductDeliver;
