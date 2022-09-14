import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

export default function AddSiteModal({
  isOpen,
  onClose,
  onOpen,
  text = "Add Your First Site",
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const auth = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
      // settings: {
      //   icons: true,
      //   timestamp: true,
      //   ratings: false
      // }
    };

    const { id } = createSite(newSite);

    toast({
      title: "Success!",
      description: "We've created your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    mutate(
      "/api/sites",
      async (data) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    );

    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {text}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.site}>
              <FormLabel>Site Name</FormLabel>
              <Input
                type="text"
                ref={initialRef}
                placeholder="My Blog"
                name="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                })}
              />
              {!errors.name ? (
                <FormHelperText>You may change this anytime.</FormHelperText>
              ) : (
                <FormErrorMessage>Site name is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.url} mt={10}>
              <FormLabel>Site Link</FormLabel>
              <Input
                type="text"
                name="url"
                ref={finalRef}
                placeholder="https://ryanyogan.com"
                {...register("url", {
                  required: true,
                  minLength: 2,
                })}
              />
              {!errors.url ? (
                <FormHelperText>Please enter a valid url.</FormHelperText>
              ) : (
                <FormErrorMessage>Site Link is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              backgroundColor="gray.700"
              color="white"
              _hover={{
                bg: "gray.800",
              }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
