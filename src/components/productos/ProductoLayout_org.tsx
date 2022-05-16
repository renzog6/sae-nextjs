import {
  Flex as Box,
  Spacer,
  Button,
  useDisclosure,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import ProductoAdd from "./ProductoAdd";

const ProductoLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>SAE - Productos</title>
      </Head>
      <VStack
        h="100vh"
        w="full"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box py={2}>
          <Heading>Productos</Heading>
          <Spacer />

          <Link href={"/productos"}>
            <Button as={"a"} colorScheme="teal" size="md">
              Listado
            </Button>
          </Link>
          <Spacer />

          <Button onClick={onOpen} colorScheme="teal" size="md">
            Nuevo
            {isOpen && <ProductoAdd isOpen={isOpen} onClose={onClose} />}
          </Button>
          <Spacer />

          <Link href={"/productos/deliver"}>
            <Button as={"a"} colorScheme="teal" size="md">
              Entegar
            </Button>
          </Link>
          <Spacer />

          <Link href={"/productos/ver"}>
            <Button as={"a"} colorScheme="red" size="md">
              NO Click!!!
            </Button>
          </Link>
        </Box>
        <Box>{children}</Box>
      </VStack>
    </>
  );
};

export default ProductoLayout;
