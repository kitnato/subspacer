import { useState } from "react";
import { Modal } from "react-bootstrap";
import { QuestionSquare } from "react-bootstrap-icons";

export default function () {
  const [isShowing, setShowing] = useState(false);

  const handleShow = (state: boolean) => setShowing(state);

  return (
    <span>
      <QuestionSquare onClick={() => handleShow(true)} style={{ cursor: "pointer" }} />

      <Modal onHide={() => handleShow(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>About</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Subspacer is a proof-of-concept that allows you to upload files from your device to the
          distributed & decentralized storage of the{" "}
          <a href="https://subspace.network/">Subspace Network</a> and retrieve them.
        </Modal.Body>
      </Modal>
    </span>
  );
}
