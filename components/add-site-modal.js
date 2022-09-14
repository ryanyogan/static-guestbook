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

export default function AddSiteModal({ isOpen, onClose }) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const auth = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ site, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      site,
      url,
    });

    toast({
      title: "Success!",
      description: "We've created your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
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
                name="site"
                {...register("site", {
                  required: true,
                  minLength: 2,
                })}
              />
              {!errors.site ? (
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
