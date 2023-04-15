import Layout from "@/components/Layout";
import { Task } from "@/models/Tasks";
import {
  Card,
  CardBody,
  FormControl,
  Input,
  FormLabel,
  Textarea,
  Button,
  Icon,
  Stack,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { MdSave, MdDelete } from "react-icons/md";

export default function newPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const initialState = {
    title: "",
    description: "",
  };
  const [task, setTask] = useState(initialState);

  const loadTask = async (id: string) => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks/" + id);
      const task = await res.json();
      setTask({ title: task.title, description: task.description });
    } catch (e) {
      console.error(e);
    }
  };

  const createTask = async (task: Task) => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const updateTask = async (id: string, task: Task) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTask({ ...task, [name]: value });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, task);
      } else {
        createTask(task);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadTask(router.query.id);
    } else {
      setTask(initialState);
    }
  }, [router.query]);

  return (
    <Layout>
      <Card maxW="sm" m={2} p={4} mx="auto" my="auto">
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Title:</FormLabel>
                <Input
                  type="text"
                  placeholder="Write your title"
                  name="title"
                  onChange={handleChange}
                  value={task.title}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description:</FormLabel>
                <Textarea
                  placeholder="Write your description"
                  name="description"
                  rows={2}
                  onChange={handleChange}
                  value={task.description}
                />
              </FormControl>
              <Flex justifyContent="space-between">
                {router.query.id ? (
                  <Button type="submit" bg="#70c0df" width="30%">
                    <Icon as={MdSave} mr={2} />
                    Update
                  </Button>
                ) : (
                  <Button type="submit" bg="#70dfa2" width="30%">
                    <Icon as={MdSave} mr={2} />
                    Save
                  </Button>
                )}
                {router.query.id && (
                  <Button bg="red.500" onClick={onOpen} width="30%">
                    <Icon as={MdDelete} mr={2} />
                    Delete
                  </Button>
                )}
              </Flex>
            </Stack>
          </form>
        </CardBody>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  typeof router.query.id === "string" &&
                    deleteTask(router.query.id);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Layout>
  );
}
