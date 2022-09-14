import { Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import AddSiteModal from "./add-site-modal";

import DashboardShell from "./dashboard-shell";

export default function EmptyState() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardShell>
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
        <Button onClick={onOpen} fontWeight="medium" maxW="200px">
          Add Your First Site
        </Button>
        <AddSiteModal isOpen={isOpen} onClose={onClose} />
      </Flex>
    </DashboardShell>
  );
}
