import { Badge, Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

import About from "@subspacer/components/About";
import { version } from "@subspacer/config";

export default function () {
  return (
    <Navbar className="mb-4" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <Stack direction="horizontal" gap={3}>
            <h3 style={{ marginBottom: 0 }}>Subspacer</h3>

            <About />
          </Stack>
        </Navbar.Brand>

        <Nav className="d-none d-sm-block ml-auto mr-auto" />

        <Nav>
          <Stack direction="horizontal" gap={3}>
            <Badge bg="secondary" text="dark">
              v{version}
            </Badge>

            <Button href="https://www.github.com/cneuro/subspacer" variant="outline-primary">
              <Github /> Source
            </Button>
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}
