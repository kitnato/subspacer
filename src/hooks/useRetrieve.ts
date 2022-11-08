import { hexToU8a } from "@polkadot/util";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { api, error, isLoading } from "@subspacer/state/atoms";

export default function () {
  const apiValue = useRecoilValue(api);
  const resetError = useResetRecoilState(error);
  const setError = useSetRecoilState(error);
  const setLoading = useSetRecoilState(isLoading);

  const errorDomain = "retrieval request";

  return async (objectID: string) => {
    if (!apiValue) {
      return;
    }

    resetError();
    setLoading("Retrieving");

    try {
      const result: { data: string } = await apiValue.provider.send("findObject", [objectID]);

      setLoading(false);

      if (result && result.data) {
        return hexToU8a(result.data);
      }

      return setError({
        description: `Cannot find file with objectID "${objectID}"`,
        domain: errorDomain,
        isShowing: true,
      });
    } catch (error) {
      setError({
        description: (error as Error).toString(),
        domain: errorDomain,
        isShowing: true,
      });
    }
  };
}
