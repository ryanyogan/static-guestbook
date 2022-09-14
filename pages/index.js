import { Button, Flex } from "@chakra-ui/react";
import Head from "next/head";

import { useAuth } from "../lib/auth";

export default function Index() {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback (React 2025)</title>
      </Head>

      {auth.user ? (
        <Button
          backgroundColor="black"
          color="white"
          mt={4}
          onClick={(e) => auth.signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          backgroundColor="black"
          color="white"
          mt={4}
          onClick={(e) => auth.signinWithGithub()}
        >
          Sign In
        </Button>
      )}
    </Flex>
  );
}
