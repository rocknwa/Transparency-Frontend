// components/ClientAlchemyProvider.tsx
import { ReactNode } from 'react';
import { AlchemyAccountProvider, createConfig } from "@account-kit/react";
import { arbitrumSepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const alchemyConfig = createConfig({
  transport: alchemy({ apiKey: 'M6k3Rlnvks6m2ZGnxo-wMv_UpemW_bGJ' }),
  chain: arbitrumSepolia,
  ssr: true,
  enablePopupOauth: true,
});

const queryClient = new QueryClient();

export default function ClientAlchemyProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={alchemyConfig} queryClient={queryClient}>
        {children}
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
