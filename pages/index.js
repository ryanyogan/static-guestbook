import { Button, Code, Heading, Text } from "@chakra-ui/core";
import Head from "next/head";

import { useAuth } from "../lib/auth";

export default function Index() {
  const auth = useAuth();

  return (
    <div className="container">
      <Head>
        <title>Fast Feedback (React 2025)</title>
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current User: <Code>{auth.user ? auth.user.email : "None"}</Code>
        </Text>
        {auth.user ? (
          <div>
            <p>Email: {auth.user.email}</p>
            <Button onClick={(e) => auth.signout()}>Sign out</Button>
          </div>
        ) : (
          <Button onClick={(e) => auth.signinWithGithub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
}
