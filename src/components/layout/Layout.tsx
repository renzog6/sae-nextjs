import Header from "./Header";
import Sidebar from "./Sidebar";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import { useAuth } from "../../contexts/authContext";

export default function Layout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, login, logout } = useAuth();

  return (
    <Box minH="100vh">
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/*= Header =*/}
      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
