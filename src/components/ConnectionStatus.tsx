import { Badge } from "react-bootstrap";

export function ConnectionStatus({ isOK }: { isOK: boolean }) {
  return <Badge bg={isOK ? "success" : "danger"}>{isOK ? "OK" : "DISCONNECTED"}</Badge>;
}
