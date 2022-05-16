import React, { useContext } from "react";
import {
  Flex,
  Heading,
  Text,
  Icon,
  Link,
  useDisclosure,
  Drawer,
  DrawerContent,
  Container,
} from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthContext from "../../contexts/authContext";
import LoginForm from "./LoginForm";

export default function Dashboard({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useContext(AuthContext);

  if (!auth.authorized) {
    return (
      <>
        <LoginForm />
      </>
    );
  }
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        {children}
      </Flex>
    </Container>
  );
}
