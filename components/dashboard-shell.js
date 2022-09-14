import { useAuth } from "@/lib/auth";
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Link,
} from "@chakra-ui/core";
import NextLink from "next/link";

export default function DashboardShell({ children }) {
  const { user } = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex backgroundColor="white" mb={[8, 16]} w="full">
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
              <Link>
                <Icon name="logo" size="24px" mr={8} />
              </Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems={"center"}>
            <NextLink href="/account" passHref>
              <Link>
                <Avatar size="sm" src={user?.photoUrl} />
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW={"1250px"} px={[0, 8, 8]}>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage={true}>
            <BreadcrumbLink color="gray.700">Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading color="black">Sites</Heading>
        {children}
      </Flex>
    </Box>
  );
}
