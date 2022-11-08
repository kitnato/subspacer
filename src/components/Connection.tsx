import { useEffect, useState } from "react";
import { Button, Card, Form, OverlayTrigger, Stack, Table, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ConnectionStatus from "@subspacer/components/ConnectionStatus";
import useAPI from "@subspacer/hooks/useAPI";
import useWallet from "@subspacer/hooks/useWallet";
import { api, isLoading, keyring, selectedAddress } from "@subspacer/state/atoms";
import { getAccountName } from "@subspacer/utilities/helpers";

export default function () {
  const [selectedAddressValue, setSelectedAddress] = useRecoilState(selectedAddress);
  const apiValue = useRecoilValue(api);
  const keyringValue = useRecoilValue(keyring);
  const setLoading = useSetRecoilState(isLoading);

  const [availableAddresses, setAvailableAddresses] = useState<Record<string, string>>({});

  const connectAPI = useAPI();
  const connectWallet = useWallet();

  const availableAddressesEntries = Object.entries(availableAddresses);
  const isConnected = apiValue && keyringValue;

  const handleAddressSelect = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedAddress(value);
  const handleConnection = () => void (async () => await connectWallet())();

  useEffect(() => {
    if (!apiValue && keyringValue) {
      void (async () => await connectAPI())();
    }
  }, [apiValue, connectAPI, keyringValue, setLoading]);

  useEffect(() => {
    if (Object.keys(availableAddresses).length === 0 && keyringValue) {
      setAvailableAddresses(
        keyringValue.getPairs().reduce((addresses, { address, meta }, index) => {
          if (index === 0 && !selectedAddressValue) {
            setSelectedAddress(address);
          }

          return {
            ...addresses,
            [address]: getAccountName({ address, meta }),
          };
        }, {})
      );
    }
  }, [availableAddresses, keyringValue, selectedAddressValue, setSelectedAddress]);

  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <h4>Connection</h4>

          <Table className="table-connection" size="sm">
            <tbody>
              <tr>
                <td>Wallet:</td>

                <td>
                  <ConnectionStatus isOK={Boolean(keyringValue)} />
                </td>
              </tr>

              <tr>
                <td>Subspace Network:</td>

                <td>
                  <ConnectionStatus isOK={Boolean(apiValue)} />
                </td>
              </tr>

              <tr>
                <td>Using account:</td>

                <td>
                  {availableAddressesEntries.length === 0 ? (
                    "None"
                  ) : (
                    <Form.Select onChange={handleAddressSelect} value={selectedAddressValue}>
                      {availableAddressesEntries.map(([address, name]) => (
                        <option key={address} value={address}>
                          {name}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>

          <OverlayTrigger
            overlay={
              <Tooltip>
                Requires a Substrate Framework wallet browser extension, e.g. SubWallet.
              </Tooltip>
            }
            trigger={isConnected ? [] : ["hover", "focus"]}
          >
            <div style={{ width: "fit-content" }}>
              <Button onClick={handleConnection} variant="primary">
                {isConnected ? "Reconnect" : "Connect wallet"}
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </Card.Body>
    </Card>
  );
}
