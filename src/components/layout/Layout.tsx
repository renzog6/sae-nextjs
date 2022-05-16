import Header from "./Header";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

import AuthContext from "../../contexts/authContext";
import LoginForm from "./LoginForm";

export default function Layout({ children }) {
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
    <Box>
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

      <Header onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
