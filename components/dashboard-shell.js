import { useAuth } from "@/lib/auth";
import { Avatar, Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Logo from "./logo";

export default function DashboardShell({ children }) {
  const { user, signout } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={[8, 16]} w="full" shadow="sm">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link mr={8}>
                <Logo />
              </Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems={"center"}>
            {user && (
              <Button variant="ghost" mr={2} onClick={() => signout()}>
                Log Out
              </Button>
            )}
            <NextLink href="/account" passHref>
              <Link>
                <Avatar size="sm" src={user?.photoUrl} />
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW={"1250px"} px={8}>
        {children}
      </Flex>
    </Box>
  );
}
