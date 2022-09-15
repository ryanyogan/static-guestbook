import { Button, Flex, Text } from "@chakra-ui/react";

import { useAuth } from "@/lib/auth";
import { BsGithub, BsGoogle } from "react-icons/bs";

export function LoginButtons() {
  const auth = useAuth();

  return (
    <Flex direction={["column", "row"]}>
      <Button
        onClick={() => auth.signinWithGitHub()}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        mr={2}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        <BsGithub />
        <Text ml={2}>Continue with GitHub</Text>
      </Button>
      <Button
        onClick={() => auth.signinWithGoogle()}
        backgroundColor="white"
        color="gray.900"
        variant="outline"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.100" }}
        _active={{
          bg: "gray.100",
          transform: "scale(0.95)",
        }}
      >
        <BsGoogle />
        <Text ml={2}>Continue with Google</Text>
      </Button>
    </Flex>
  );
}

export default LoginButtons;
