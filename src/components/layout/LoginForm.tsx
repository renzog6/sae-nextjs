import React, { useContext, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  chakra,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { userService } from "../../services/user.services";
import AuthContext from "../../contexts/authContext";
import ErrorMessage from "./ErrorMessage";
import { useRouter } from "next/router";

import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //alert(`Email: ${user} & Password: ${password}`);
    setIsLoading(true);
    try {
      userService
        .login(username, password)
        .then(() => {
          // get return url from query parameters or default to '/'
          //const returnUrl = router.query.returnUrl || "/";
          auth.login();
          setIsLoading(false);
          router.push("/");
        })
        .catch((e) => {
          setError("Invalid username or password");
          setUsername("");
          setPassword("");
          console.log(e);
        });
      setIsLoading(false);
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="blue.500" />}
                />
                <Input
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUsername(event.currentTarget.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="blue.500" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              variant="outline"
              width="full"
              mt={4}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
