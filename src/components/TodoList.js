import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import {
  IconButton,
  Checkbox,
  Box,
  Flex,
  Center,
  VStack,
  StackDivider,
  WrapItem,
  Wrap,
  Container,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Todos({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setTodos(todos);
  };
  const addTodo = async (taskText) => {
    let task = taskText.trim();
    if (task.length) {
      let { data: todo, error } = await supabase
        .from("todos")
        .insert({ task, user_id: "07f3a5cc-f4c4-4aa4-a78d-092abeda9bf3" })
        .single();
      if (error) setError(error.message);
      else setTodos([...todos, todo]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await supabase.from("todos").delete().eq("id", id);
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={1}
      align="stretch"
    >
      <Box w="100%" p={2} color="white">
        <h1>Todo List.</h1>
        <Flex direction="row" spacing={4}>
          <Input
            type="text"
            placeholder="make coffee"
            value={newTaskText}
            onChange={(e) => {
              setError("");
              setNewTaskText(e.target.value);
            }}
          />
          <Button className="btn-black" onClick={() => addTodo(newTaskText)}>
            Add
          </Button>
          {!!errorText && <Alert text={errorText} />}
        </Flex>
      </Box>

      <Box bg="tomato" w="100%" p={2} color="white">
        <Wrap>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </Wrap>
      </Box>
    </VStack>
  );
}

const Todo = ({ todo, onDelete }) => {
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .single();
      if (error) {
        throw new Error(error);
      }
      setIsCompleted(data.is_complete);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <WrapItem>
      <Center w="250px" h="150px" bg="red.200">
        <Container bg="green.500" w="100%">
          {todo.task}
        </Container>
        <Box w="100%" bg="green.500">
          <Checkbox
            colorScheme="green"
            size="lg"
            onChange={(e) => toggle()}
            checked={isCompleted ? true : ""}
          />
        </Box>
        <Box bg="green.500">
          <IconButton
            icon={<CloseIcon />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
          />
        </Box>
      </Center>
    </WrapItem>
  );
};

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
