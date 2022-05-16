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
  InputRightElement,
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
  VStack,
} from "@chakra-ui/react";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import { supabase } from "../../services/supabase";
import { FiSearch } from "react-icons/fi";

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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <VStack
        h="100vh"
        w="full"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Flex alignContent="center">
          <InputGroup mb={4} borderRadius="10px" mr={2}>
            <Input
              type="text"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              placeholder="Buscar..."
              borderRadius="10px"
            />
            <InputRightElement pointerEvents="none" children={<FiSearch />} />
          </InputGroup>
        </Flex>

        <Box h="100vh" w="full">
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
              {items
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.nombre
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((item) => (
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
                        aria-label="Edit"
                        icon={<EditIcon />}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </>
  );
}

export default ProductoList;
