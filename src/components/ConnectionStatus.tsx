import { Badge } from "react-bootstrap";

export default function ({ isOK }: { isOK: boolean }) {
  return <Badge bg={isOK ? "success" : "danger"}>{isOK ? "OK" : "DISCONNECTED"}</Badge>;
}
