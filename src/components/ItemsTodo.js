import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import {
  Flex,
  Box,
  StackDivider,
  VStack,
  Wrap,
  WrapItem,
  Center,
  Container,
} from "@chakra-ui/react";

export default function Items() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("items")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={1}
      align="stretch"
    >
      <Box>
        <Wrap>
          {todos.map((todo) => (
            <Item key={todo.id} todo={todo} />
          ))}
        </Wrap>
      </Box>
    </VStack>
  );
}

const Item = ({ todo }) => {
  return (
    <WrapItem>
      <Center w="250px" h="150px" bg="red.200">
        <Container bg="green.500" w="100%">
          {todo.name}
        </Container>
      </Center>
    </WrapItem>
  );
};
