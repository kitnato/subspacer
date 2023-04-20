import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { error } from "@subspacer/state/atoms";

export function AppError() {
  const { description, domain, isShowing } = useRecoilValue(error);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isShowing);
  }, [isShowing]);

  return (
    <Alert dismissible onClose={() => setShow(false)} show={show} variant="danger">
      <Alert.Heading>{`Error in ${domain}:`}</Alert.Heading>

      <span>{description}</span>
    </Alert>
  );
}
