import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { arbitrum, alchemy } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" },
        { type: "social", authProviderId: "facebook", mode: "popup" },
      ],
    ],
    addPasskeyOnSignup: false,
  },
};

export const config = createConfig(
  {
    transport: alchemy({ apiKey: "YOUR_ALCHEMY_API_KEY" }), // Replace with your Alchemy API key
    chain: arbitrum,
    ssr: true, // Set to false if not using server-side rendering
    enablePopupOauth: true,
  },
  uiConfig
);

export const queryClient = new QueryClient();
