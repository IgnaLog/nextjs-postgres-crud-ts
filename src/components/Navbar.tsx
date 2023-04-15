import { Flex, Link, Button, Container } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <Flex bg="white">
      <Container maxWidth="1200px" p={4}>
        <Flex justifyContent="space-between">
          <Link mr={8} href="/">
            <Image src="/logoChakra.png" width={40} height={40} alt="logo" />
          </Link>

          <Button
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              router.push("/tasks/new");
            }}
          >
            New Task
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
}
