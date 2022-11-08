import { Col, Container, Row, Stack } from "react-bootstrap";

import Connection from "@subspacer/components/Connection";
import Error from "@subspacer/components/Error";
import Header from "@subspacer/components/Header";
import Loading from "@subspacer/components/Loading";
import Retrieval from "@subspacer/components/Retrieval";
import Submission from "@subspacer/components/Submission";

export default function () {
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

        <Error />

        <Retrieval />
      </Stack>

      <Loading />
    </Container>
  );
}
