import { ReactNode } from "react";
import Navbar from "./Navbar";
import { Box, Container } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <Container maxW="1200px">
        <Box m={8}>{children}</Box>
      </Container>
    </div>
  );
}
