import { Box, Code, Switch } from "@chakra-ui/react";
import RemoveButton from "./RemoveButton";
import { Table, Td, Th, Tr } from "./table";

export default function FeedbackTable({ feedback: allFeedback }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Author</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th> </Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>/blog</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="green"
                defaultChecked={feedback.status === "active"}
              />
            </Td>
            <Td>
              <RemoveButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
}
