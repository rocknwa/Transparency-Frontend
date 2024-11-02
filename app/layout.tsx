// app/layout.tsx
'use client';

import { AlchemyAccountProvider, createConfig } from "@account-kit/react";
import { arbitrumSepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient();
const alchemyConfig = createConfig({
  transport: alchemy({ apiKey: 'YOUR_ALCHEMY_API_KEY' }),
  chain: arbitrumSepolia,
  enablePopupOauth: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AlchemyAccountProvider config={alchemyConfig} queryClient={queryClient}>
            {children}
          </AlchemyAccountProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
