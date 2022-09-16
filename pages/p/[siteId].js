import Feedback from "@/components/feedback";
import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback, error } = await getAllFeedback(siteId);

  if (error) {
    throw new Error("Feedback catch failed");
  }

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const [allFeedback, setAllfeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("comment");

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      createdAt: new Date().toISOString(),
      text,
      provider: auth.user.provider,
      status: "pending",
    };

    setAllfeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="full"
      maxW="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input type="text" name="comment" />
          <Button fontWeight="medium" type="submit" mt={2}>
            Add Comment
          </Button>
        </FormControl>
      </Box>

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
    </Box>
  );
}
