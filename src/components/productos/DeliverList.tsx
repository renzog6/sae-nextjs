import * as React from "react";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useProductoContext } from "../../contexts/productoContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeliverAdd from "./DeliverAdd";

function DeliverList({ items, isOpenX, onOpenX, onCloseX }) {
  const productoCtx = useProductoContext();
  let SinImagen = "/404.png";
  const [searchTerm, setSearchTerm] = useState("");
  const [itemx, setItemx] = useState();

  const handleClick = (data: any) => {
    setItemx(data);
    onOpenX();
  };

  return (
    <>
      <VStack
        w="100%"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        px={2}
      >
        <Box w="100%" px="5">
          <InputGroup width="auto">
            <InputLeftAddon children={<SearchIcon />} />
            <Input
              placeholder="Buscar"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </InputGroup>
        </Box>
        <Box
          overflowX="auto"
          whiteSpace="nowrap"
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {isOpenX && (
            <DeliverAdd isOpen={isOpenX} onClose={onCloseX} data={itemx} />
          )}
          <TableContainer>
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
                          aria-label="Add"
                          icon={<AddIcon />}
                          //onClick={() => productoCtx.addToDeliverList({ item })}
                          onClick={() => handleClick(item)}
                        ></IconButton>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </>
  );
}

export default DeliverList;
