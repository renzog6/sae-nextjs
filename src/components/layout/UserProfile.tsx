import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiBell } from "react-icons/fi";

import AuthContext from "../../contexts/authContext";
import { userService } from "../../services/user.services";
import { ModeToggle } from "./ModeToggle";

export default function UserProfile() {
  const auth = useContext(AuthContext);
  //const [user, setUser] = useState(null);

  /*   useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []); */
  console.log("USR::::::: " + auth.user);
  if (!auth.user) {
    return (
      <Flex alignItems={"center"}>
        <NextLink href="/account/login" passHref>
          <Link>Login</Link>
        </NextLink>
      </Flex>
    );
  }

  function logout() {
    auth.logout();
    userService.logout();
  }

  return (
    <HStack spacing={{ base: "0", md: "6" }}>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="open menu"
        icon={<FiBell />}
      />
      <Flex alignItems="center">
        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack spacing="4">
              <Avatar size="md" src="" />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="lg">{auth.user.email}</Text>
                <Text fontSize="md" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList fontSize="lg" borderColor="gray.200">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => logout()}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
