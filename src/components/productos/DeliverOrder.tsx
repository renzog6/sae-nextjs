import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  IconButton,
  Input,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useProductoContext } from "../../contexts/productoContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DeliverOrder = ({ items }) => {
  const useCtx = useProductoContext();
  const [startDate, setStartDate] = useState(new Date());
  const [quien, setQuien] = useState("");

  const handleSubmit = () => {
    useCtx.updateDeliver(startDate, quien);
  };

  return (
    <>
      <VStack
        w={"full"}
        h={"full"}
        px={2}
        spacing={5}
        alignItems={"flex-start"}
        bg={"gray.700"}
      >
        <Box maxH="40em" w="100%">
          <SimpleGrid columns={2} spacing={5}>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel htmlFor="fecha">Fecha</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Quien retira?</FormLabel>
                <Input
                  id="quien"
                  value={quien}
                  onChange={(e) => setQuien(e.target.value)}
                  required={true}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Box>
                <Table variant="striped" colorScheme="teal">
                  <Thead>
                    <Tr>
                      <Th>Nombre</Th>
                      <Th>Tipo</Th>
                      <Th>Stock</Th>
                      <Th>X</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items.map((item) => (
                      <Tr key={item.id}>
                        <Td>{item.nombre}</Td>
                        <Td>{item.tipo}</Td>
                        <Td>{item.stock}</Td>
                        <Td>
                          <IconButton
                            colorScheme="red"
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <Button onClick={handleSubmit}>Guardar</Button>
            </GridItem>
            <GridItem colSpan={1}>
              <Button>Cancelar</Button>
            </GridItem>
          </SimpleGrid>
        </Box>
      </VStack>
    </>
  );
};
export default DeliverOrder;
