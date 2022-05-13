import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";

import { AuthProvider } from "../contexts/authContext";
import { ProductoProvider } from "../contexts/productoContext";

import { theme } from "../theme/theme";
import "../theme/date-picker.css";
import { ModeToggle } from "../components/layout/ModeToggle";

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ProductoProvider>
          <ModeToggle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProductoProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
