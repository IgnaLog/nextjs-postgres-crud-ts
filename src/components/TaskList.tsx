import { Task } from "@/models/Tasks";
import { Card, SimpleGrid, CardBody, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  tasks: Task[];
};

const TaskList = ({ tasks }: Props) => {
  const router = useRouter();
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing="20px" m={4}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          cursor="pointer"
          _hover={{
            transform: "translateY(-5px)",
            transition: "transform 0.2s ease-in-out",
          }}
          onClick={() => {
            router.push(`/tasks/edit/${task.id}`);
          }}
        >
          <CardBody>
            <Heading as="h3" size="md" mb="2">
              {task.title}
            </Heading>
            <Text mb="4" fontSize="xs">
              {new Date(task.created_on ?? "").toLocaleDateString()}
            </Text>
            <Text mb="4">{task.description}</Text>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};
export default TaskList;
