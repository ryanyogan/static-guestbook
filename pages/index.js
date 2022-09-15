import LoginButtons from "@/components/login-buttons";
import Logo from "@/components/logo";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import Head from "next/head";

import { useAuth } from "../lib/auth";

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export default function Index() {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16} px={16}>
        <Flex as="main" direction="column" maxW={"700px"} margin="0 auto">
          <Head>
            <title>Fast Feedback (React 2025)</title>
          </Head>

          <Logo width="48px" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight={"bold"} display="inline">
              Fucking-Fast Feedback
            </Text>
            {" was built out of "}
            <Link
              href="https://news.ycombinator.com"
              isExternal
              textDecoration="underline"
            >
              Hacker News
            </Link>
            {` becoming a wonderful place for bike-shedding. Try out a quick, easy service to leave some legit-feedback.  This is the easiest service to implement out there. 😁`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
    </>
  );
}
