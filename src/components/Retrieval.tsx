import { Button, Card, Col, OverlayTrigger, Row, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import FilePreview from "@subspacer/components/FilePreview";
import useRetrieve from "@subspacer/hooks/useRetrieve";
import { api, fileMapping, isLoading } from "@subspacer/state/atoms";

export default function () {
  const [fileMappingValue, setFileMapping] = useRecoilState(fileMapping);
  const apiValue = useRecoilValue(api);
  const setLoading = useSetRecoilState(isLoading);

  const doRetrieve = useRetrieve();

  const fileMappingEntries = Object.entries(fileMappingValue);
  const fileMappingObjectIDs = fileMappingEntries.filter(([, { objectID }]) => objectID);
  const fileMappingRemoteObjects = fileMappingEntries.filter(([, { remote }]) => remote);
  const areAllFilesRetrieved =
    fileMappingEntries.length > 0 &&
    fileMappingEntries.reduce(
      (isRetrieved, [, { objectID, remote }]) =>
        isRetrieved && Boolean(objectID) && Boolean(remote),
      true
    );
  const isRetrievalEnabled = !areAllFilesRetrieved && fileMappingObjectIDs.length > 0;

  const handleRetrieve = () =>
    void (async () => {
      if (fileMappingEntries.length > 0) {
        setLoading("Retrieving");

        for (const [name, { objectID, remote }] of fileMappingEntries) {
          if (objectID && !remote) {
            const object = await doRetrieve(objectID);

            // if (object) {
            setFileMapping((current) => ({ ...current, [name]: { ...current[name], object } }));
            // }
          }
        }

        setLoading(false);
      }
    })();

  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <h4>Retrieval</h4>

          <Stack>
            <h5>Uploaded object IDs:</h5>

            {fileMappingObjectIDs.length === 0 ? (
              "None."
            ) : (
              <span>
                {fileMappingObjectIDs
                  .map(([name, { objectID }]) => `${objectID} (${name})`)
                  .join(", ")}
              </span>
            )}
          </Stack>

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!apiValue && "Not connected to Subspace Network."}{" "}
                {fileMappingObjectIDs.length === 0 && "No files uploaded."}{" "}
                {areAllFilesRetrieved && "All uploaded files were retrieved."}
              </Tooltip>
            }
            trigger={isRetrievalEnabled ? [] : ["hover", "focus"]}
          >
            <div style={{ width: "fit-content" }}>
              <Button disabled={!isRetrievalEnabled} onClick={handleRetrieve}>
                Retrieve uploaded files
              </Button>
            </div>
          </OverlayTrigger>

          {fileMappingRemoteObjects.length === 0 ? (
            <span>Nothing retrieved.</span>
          ) : (
            <span>Retrieved objects:</span>
          )}

          <Row lg="6" md="4" xs="1">
            {fileMappingRemoteObjects.map(([name, { remote }]) => (
              <Col key={name}>
                <FilePreview allowDownload name={name} object={remote} />
              </Col>
            ))}
          </Row>
        </Stack>
      </Card.Body>
    </Card>
  );
}
