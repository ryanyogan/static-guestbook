import { Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import AddSiteModal from "./add-site-modal";

export default function EmptyState() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      width={"100%"}
      backgroundColor="white"
      borderRadius={"8px"}
      p={16}
    >
      <Heading mb={2} size="lg">
        You have not added any sites yet.
      </Heading>
      <Text mb={4}>Welcome 👋🏻 Let&apos;s get started.</Text>
      <AddSiteModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
}
