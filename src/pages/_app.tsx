import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../contexts/authContext";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ProductoProvider } from "../contexts/productoContext";

import theme from "../theme/theme";
import "../theme/date-picker.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <ProductoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductoProvider>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
