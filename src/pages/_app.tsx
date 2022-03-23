import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../contexts/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
