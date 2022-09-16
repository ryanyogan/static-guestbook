import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import AddSiteModal from "./add-site-modal";

export default function SiteTableHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
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
