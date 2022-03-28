import * as React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Stack,
  StackDivider,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import { supabase } from "../../services/supabase";

function ProductoList({ items }) {
  let SinImagen = "/404.png";

  /*   useEffect(() => {
    const fetchTodos = async () => {
      let { data: todos, error } = await supabase
        .from("productos")
        .select("*")
        .order("nombre", { ascending: false });
      if (error) console.log("error", error);
      else setItems(todos);
    };
    fetchTodos();
  }, []); */

  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>IMG</Th>
            <Th>Nombre</Th>
            <Th>Tipo</Th>
            <Th>Stock</Th>
            <Th>X</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Avatar src={SinImagen} />
              </Td>
              <Td>{item.nombre}</Td>
              <Td>{item.tipo}</Td>
              <Td>{item.stock}</Td>
              <Td>
                <IconButton
                  colorScheme="blue"
                  aria-label="Search database"
                  icon={<EditIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default ProductoList;
