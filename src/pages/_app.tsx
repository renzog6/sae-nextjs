import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../contexts/authContext";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
