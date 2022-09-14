import Feedback from "@/components/feedback";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../lib/auth";
import { createFeedback } from "../../models/feedback";
import { getAllFeedback, getAllSites } from "../../models/site";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 60,
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
    fallback: true,
  };
}

export default function FeedbackPage({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const inputRef = useRef();
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputRef.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    inputRef.current.value = "";
    setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input
              ref={inputRef}
              id="comment"
              placeholder="Leave a comment.."
            />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback
            key={feedback.id || new Date().getTime().toString()}
            {...feedback}
          />
        ))}
    </Box>
  );
}
