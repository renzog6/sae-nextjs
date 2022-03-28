import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  Spacer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import ProductoAdd from "./ProductoAdd";

const ProductoLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>SAE - Productos</title>
      </Head>
      <Flex py={2}>
        <InputGroup width="auto">
          <Input placeholder="Buscar" width="250px" />
          <InputRightAddon children={<SearchIcon />} />
        </InputGroup>
        <Spacer />

        <Button onClick={onOpen} colorScheme="teal" size="md">
          Agregar
          {isOpen && <ProductoAdd isOpen={isOpen} onClose={onClose} />}
        </Button>
        <Spacer />
        <Button colorScheme="teal" size="md">
          Button
        </Button>
        <Spacer />
        <Button colorScheme="teal" size="md">
          Button
        </Button>
      </Flex>

      <Flex>{children}</Flex>
    </>
  );
};

export default ProductoLayout;
