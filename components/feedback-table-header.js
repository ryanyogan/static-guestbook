import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import AddSiteModal from "./add-site-modal";

export default function FeedbackTableHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Feedback</Heading>
        <AddSiteModal
          text="Add New Site"
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </Flex>
    </>
  );
}
