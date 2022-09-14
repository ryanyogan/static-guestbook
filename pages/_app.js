import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "../lib/auth";

import themeConfig from "../styles/theme";

const theme = extendTheme(themeConfig);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
