import { Drawer, DrawerContent, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="100vh" maxW="2000px" flexDir="row" overflow="hidden">
      {/*column menu*/}
      <Flex w="15%" flexDir="column">
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
      </Flex>

      {/*column center*/}
      <Flex w="85%" p="3%" flexDir="column" overflow="auto" minH="100vh">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
