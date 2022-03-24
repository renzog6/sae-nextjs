import { useUser } from "@auth0/nextjs-auth0";
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
import { FiChevronDown, FiBell } from "react-icons/fi";

export default function UserProfile() {
  const { user, error, isLoading } = useUser();
  if (!user) {
    return (
      <Flex alignItems={"center"}>
        <NextLink href="/api/auth/login" passHref>
          <Link>Login</Link>
        </NextLink>
      </Flex>
    );
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
              <Avatar size="md" src={user.picture} />
              <VStack
                display={{ base: "none", md: "flex" }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="lg">{user.nickname}</Text>
                <Text fontSize="md" color="gray.600">
                  Admin
                </Text>
              </VStack>
              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList fontSize="lg" bg="black" borderColor="gray.200">
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Billing</MenuItem>
            <MenuDivider />
            <MenuItem as="a" href="/api/auth/logout">
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
}
