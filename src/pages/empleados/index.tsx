import * as React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { SearchIcon } from "@chakra-ui/icons";

function Empleados() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getWeatherFromApiAsync = async () => {
      const resopnse = await fetch(
        "http://192.168.88.96:8080/api/empleado/list"
      );
      const resopnseJson = await resopnse.json();
      console.log("json", resopnseJson);
      setItems(resopnseJson);
    };
    getWeatherFromApiAsync();
  }, []);

  return (
    <>
      <Head>
        <title>SAE - Empleados</title>
      </Head>

      <Flex py={2}>
        <InputGroup width="auto">
          <Input placeholder="Buscar" width="250px" />
          <InputRightAddon children={<SearchIcon />} />
        </InputGroup>
        <Spacer />
        <Button colorScheme="teal" size="md">
          Button
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

      {items.map((item) => (
        <Flex key={item.idPersona} py={4}>
          <Avatar src="https://bit.ly/sage-adebayo" />
          <Box flex="4">
            <Text fontWeight="bold">
              {item.apellido} {item.nombre}
            </Text>
            <Text fontSize="sm">{item.puesto.nombre}</Text>
          </Box>
          <Spacer />
          <Box flex="4" bg="tomato">
            <Text>Box 3</Text>
          </Box>
          <Spacer />
          <Box flex="4" bg="blue">
            <Text>Box 3</Text>
          </Box>
        </Flex>
      ))}
    </>
  );
}

export default Empleados;
