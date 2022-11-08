import { Modal, Spinner, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { isLoading } from "@subspacer/state/atoms";

export default function () {
  const isLoadingValue = useRecoilValue(isLoading);

  const label = typeof isLoadingValue === "string" ? isLoadingValue : "Loading";

  return (
    <Modal centered dialogClassName="modal-loading" show={Boolean(isLoadingValue)}>
      <Modal.Body>
        <Stack className="align-items-center" gap={3} style={{ padding: 24 }}>
          <Spinner animation="border" variant="primary" />

          <span>{label} ...</span>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
