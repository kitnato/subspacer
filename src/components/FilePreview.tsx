import { useState } from "react";
import { Image, Stack } from "react-bootstrap";
import { Download, FileEarmarkText, Trash3 } from "react-bootstrap-icons";
import { useRecoilState } from "recoil";

import { fileMapping } from "@subspacer/state/atoms";

export function FilePreview({
  allowDeletion,
  allowDownload,
  name,
  object,
}: {
  allowDeletion?: boolean;
  allowDownload?: boolean;
  name: string;
  object: Uint8Array;
}) {
  const objectURL = URL.createObjectURL(new Blob([object.buffer]));

  const [fileMappingValue, setFileMapping] = useRecoilState(fileMapping);

  const [showOverlay, setShowOverlay] = useState(false);
  const [source, setSource] = useState<null | string>(objectURL);

  const handleAction = () => {
    if (allowDeletion) {
      const { local } = fileMappingValue[name];

      if (local) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setFileMapping(({ [name]: _, ...newMapping }) => newMapping);
      }
    }
  };
  const handleNonImage = () => setSource(null);

  return (
    <Stack>
      <div
        className="h-100 position-relative"
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {source ? (
          <Image
            alt={`Preview of ${name}`}
            className="w-100"
            onError={handleNonImage}
            rounded
            src={source}
            style={{ maxHeight: 200 }}
          />
        ) : (
          <FileEarmarkText className="w-100" style={{ height: 180 }} />
        )}

        <div
          className="align-items-center d-flex h-100 justify-content-center position-absolute w-100"
          onClick={handleAction}
          style={{
            background: "white",
            cursor: "pointer",
            opacity: 0.7,
            top: 0,
            visibility: showOverlay ? "visible" : "hidden",
          }}
        >
          {allowDeletion && <Trash3 size={24} />}

          {allowDownload && (
            <a download={name} href={objectURL} rel="noreferrer" target="_blank">
              <Download size={24} />
            </a>
          )}
        </div>
      </div>

      <small className="text-muted">{name}</small>
    </Stack>
  );
}
