import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";

import React, { useState } from "react";
import { useProductoContext } from "../../contexts/productoContext";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

export const DeliverOrder = ({ items }) => {
  const useCtx = useProductoContext();
  //const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [quien, setQuien] = useState("");

  const formReset = () => {
    setQuien("");
    useCtx.resetDeliver();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    useCtx.updateDeliver(date, quien);
    formReset();
  };

  return (
    <>
      <VStack
        w={"full"}
        h={"full"}
        px={2}
        spacing={5}
        alignItems={"flex-start"}
        //bg={"gray.100"}
      >
        <form onSubmit={handleSubmit}>
          <Box maxH="40em" w="100%">
            <SimpleGrid columns={2} spacing={5}>
              <GridItem colSpan={1}>
                <FormControl>
                  <FormLabel>Fecha</FormLabel>

                  <SingleDatepicker
                    name="date-input"
                    date={date}
                    onDateChange={setDate}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={2}>
                <FormControl isRequired>
                  <FormLabel>Responsable</FormLabel>
                  <Input
                    id="quien"
                    value={quien}
                    onChange={(e) => setQuien(e.target.value)}
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
            </SimpleGrid>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="100%"
              py={6}
              mb={2}
            >
              <ButtonGroup gap="8">
                <Button colorScheme="teal" type="submit">
                  Guardar
                </Button>
                <Button colorScheme="red" onClick={formReset}>
                  Cancelar
                </Button>
              </ButtonGroup>
            </Box>
          </Box>
        </form>
      </VStack>
    </>
  );
};
export default DeliverOrder;
