// components/AppLayout.tsx
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import ClientAlchemyProvider with SSR disabled
const ClientAlchemyProvider = dynamic(() => import('./ClientAlchemyProvider'), { ssr: false });

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ClientAlchemyProvider>
      {children}
    </ClientAlchemyProvider>
  );
}
