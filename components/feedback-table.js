import { Box, Code } from "@chakra-ui/react";
import { Table, Td, Th, Tr } from "./table";

export default function FeedbackTable({ allFeedback }) {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th> </Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.name}</Td>
            <Td>{feedback.text}</Td>
            <Td>
              <Code>/blog</Code>
            </Td>
            <Td>Remove</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
}
