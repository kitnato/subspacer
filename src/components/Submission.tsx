import { extension } from "mime-types";
import { useRef } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Stack,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { FilePreview } from "@subspacer/components/FilePreview";
import { useUpload } from "@subspacer/hooks/useUpload";
import { api, error, fileMapping, isLoading } from "@subspacer/state/atoms";
import {
  ACCEPTED_MIME_TYPES,
  MAXIMUM_FILE_COUNT,
  MAXIMUM_FILE_SIZE,
} from "@subspacer/utilities/constants";

export function Submission() {
  const [fileMappingValue, setFileMapping] = useRecoilState(fileMapping);
  const apiValue = useRecoilValue(api);
  const resetError = useResetRecoilState(error);
  const setError = useSetRecoilState(error);
  const setLoading = useSetRecoilState(isLoading);

  const fileInput = useRef<HTMLFormElement | null>(null);

  const doUpload = useUpload();

  const fileMappingLocalFiles = Object.entries(fileMappingValue).filter(([, { local }]) => local);

  const handleFiles = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) =>
    void (async () => {
      if (files) {
        resetError();

        const errorDomain = "file selection";

        if (fileMappingLocalFiles.length + files.length > MAXIMUM_FILE_COUNT) {
          setError({
            description: `Cannot upload more than ${MAXIMUM_FILE_COUNT} files at once.`,
            domain: errorDomain,
            isShowing: true,
          });

          fileInput.current?.reset();
          return;
        }

        for (const file of files) {
          const { name, size, type } = file;

          if (!ACCEPTED_MIME_TYPES.includes(type)) {
            setError({
              description: `"${name}" does not have an accepted MIME type ("${type}").`,
              domain: errorDomain,
              isShowing: true,
            });

            fileInput.current?.reset();
            return;
          }

          if (fileMappingValue[name].objectID) {
            setError({
              description: `"${name}" was already chosen.`,
              domain: errorDomain,
              isShowing: true,
            });

            fileInput.current?.reset();
            return;
          }

          if (size > MAXIMUM_FILE_SIZE * Math.pow(2, 20)) {
            setError({
              description: `"${name}" cannot exceed ${MAXIMUM_FILE_SIZE} MB.`,
              domain: errorDomain,
              isShowing: true,
            });

            fileInput.current?.reset();
            return;
          }

          setLoading("Processing");

          const arrayBuffer = new Uint8Array(await file.arrayBuffer());

          setLoading(false);
          setFileMapping((current) => ({
            ...current,
            [name]: { ...current[name], local: arrayBuffer },
          }));
        }

        fileInput.current?.reset();
      }
    })();

  const handleUpload = () =>
    void (async () => {
      if (fileMappingLocalFiles.length > 0) {
        for (const [name, { local }] of fileMappingLocalFiles) {
          if (local) {
            const objectID = await doUpload(local);

            if (objectID) {
              setFileMapping((current) => ({
                ...current,
                [name]: { ...current[name], local: null, objectID },
              }));
            }
          }
        }
      }
    })();

  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <h4>Submission</h4>

          <Form ref={fileInput}>
            <Form.Control
              accept={ACCEPTED_MIME_TYPES.join(",")}
              multiple
              onChange={handleFiles}
              type="file"
            />
          </Form>

          <Table size="sm">
            <tbody>
              <tr>
                <td>Accepted types:</td>

                <td>
                  {ACCEPTED_MIME_TYPES.map((type) => extension(type) || "")
                    .sort((a, b) => a.localeCompare(b))
                    .join(", ")}
                </td>
              </tr>

              <tr>
                <td>Maximum files:</td>

                <td>{MAXIMUM_FILE_COUNT}</td>
              </tr>

              <tr>
                <td>Maximum file size:</td>

                <td>{MAXIMUM_FILE_SIZE} MB</td>
              </tr>
            </tbody>
          </Table>

          <Stack>
            <h5>Files ready to upload:</h5>

            {fileMappingLocalFiles.length === 0 ? (
              "None."
            ) : (
              <Row md="3" xs="2">
                {fileMappingLocalFiles.map(
                  ([name, { local }]) =>
                    local && (
                      <Col key={name}>
                        <FilePreview allowDeletion name={name} object={local} />
                      </Col>
                    )
                )}
              </Row>
            )}
          </Stack>

          <OverlayTrigger
            overlay={
              <Tooltip>
                {fileMappingLocalFiles.length === 0 && "No files chosen for upload."}{" "}
                {!apiValue && "Not connected to Subspace Network."}
              </Tooltip>
            }
            trigger={apiValue && fileMappingLocalFiles.length > 0 ? [] : ["hover", "focus"]}
          >
            <div style={{ width: "fit-content" }}>
              <Button
                disabled={!apiValue || fileMappingLocalFiles.length === 0}
                onClick={handleUpload}
              >
                Upload to Subspace
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </Card.Body>
    </Card>
  );
}
