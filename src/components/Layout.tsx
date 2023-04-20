import { Col, Container, Row, Stack } from "react-bootstrap";

import { AppError } from "@subspacer/components/AppError";
import { Connection } from "@subspacer/components/Connection";
import { Header } from "@subspacer/components/Header";
import { Loading } from "@subspacer/components/Loading";
import { Retrieval } from "@subspacer/components/Retrieval";
import { Submission } from "@subspacer/components/Submission";

export function Layout() {
  return (
    <Container>
      <Stack gap={3}>
        <Header />

        <Row lg="2" xs="1">
          <Col>
            <Connection />
          </Col>

          <Col>
            <Submission />
          </Col>
        </Row>

        <AppError />

        <Retrieval />
      </Stack>

      <Loading />
    </Container>
  );
}
