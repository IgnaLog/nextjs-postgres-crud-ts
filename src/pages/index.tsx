import Layout from "@/components/Layout";
import TaskList from "@/components/TaskList";
import { Task } from "@/models/Tasks";
import { Grid, Button, GridItem } from "@chakra-ui/react";
import { useRouter } from "next/router";

type Props = {
  tasks: Task[];
};

export default function IndexPage({ tasks }: Props) {
  const router = useRouter();
  return (
    <Layout>
      {tasks.length === 0 ? (
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem textAlign="center">
            <h1>No tasks yet</h1>
            <Button
              onClick={() => {
                router.push("/tasks/new");
              }}
            >
              Create one
            </Button>
          </GridItem>
        </Grid>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks: tasks,
    },
  };
};
