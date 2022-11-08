import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";

import Layout from "@subspacer/components/Layout";

import "@subspacer/styles/custom.scss";
import "@subspacer/styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  </StrictMode>
);
