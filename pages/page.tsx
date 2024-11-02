// pages/index.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Users, CheckSquare, TrendingUp } from 'lucide-react';
import { Background } from '@/components/Background';
import { AlchemyAccountProvider, createConfig, useAccount, useAuthModal } from "@account-kit/react";
import { arbitrumSepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Metadata } from 'next';

const alchemyConfig = createConfig(
  {
    transport: alchemy({ apiKey: 'M6k3Rlnvks6m2ZGnxo-wMv_UpemW_bGJ' }), // Replace with your actual Alchemy API key
    chain: arbitrumSepolia,
    ssr: true,
    enablePopupOauth: true,
  },
  {
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
  }
);

const queryClient = new QueryClient();

function InnerPages({ stats }: { stats: { voters: number; votes: number; turnout: number } }) {
  const { account } = useAccount({ type: 'LightAccount' });
  const { openAuthModal } = useAuthModal();

  const handleVoteClick = () => {
    if (!account) {
      openAuthModal(); // Opens login popup if user is not authenticated
    } else {
      // Ensure the account is populated before redirecting
      setTimeout(() => {
        if (account) {
          window.location.href = '/vote';
        }
      }, 500);
    }
  };
  

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] text-green-700 dark:text-green-400 overflow-hidden">
      <Background />

      <nav className="fixed top-0 w-full flex justify-between items-center p-6 bg-green-600 text-white z-10">
        <h1 className="text-2xl font-bold">Nigerian Voting System</h1>
        <div className="space-x-4">
          <Link legacyBehavior href="/about">
            <a className="hover:underline text-lg">About</a>
          </Link>
          <Link legacyBehavior href="/contact">
            <a className="hover:underline text-lg">Contact</a>
          </Link>
        </div>
      </nav>

      <motion.h1 className="text-5xl font-bold mb-10 text-center z-10">Welcome to Vote</motion.h1>
      <motion.div className="z-10 mb-12">
        <Button onClick={handleVoteClick} className="bg-green-700 text-white text-xl px-8 py-4">
          HERE TO VOTE
        </Button>
      </motion.div>

      <motion.div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 z-10">
        <StatCard icon={<Users />} label="Registered Voters" value={stats.voters.toLocaleString()} />
        <StatCard icon={<CheckSquare />} label="Votes Cast" value={stats.votes.toLocaleString()} />
        <StatCard icon={<TrendingUp />} label="Voter Turnout" value={`${stats.turnout}%`} />
      </motion.div>
    </div>
  );
}

export function Pages() {
  const [stats, setStats] = useState({ voters: 0, votes: 0, turnout: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        voters: Math.floor(Math.random() * 1000000),
        votes: Math.floor(Math.random() * 900000),
        turnout: Math.floor(Math.random() * 100),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={alchemyConfig} queryClient={queryClient}>
        <InnerPages stats={stats} />
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center z-10">
      <div className="text-5xl mb-3 text-green-600 dark:text-green-400 flex justify-center">{icon}</div>
      <h2 className="text-2xl font-semibold mb-3">{label}</h2>
      <p className="text-4xl font-bold">{value}</p>
    </motion.div>
  );
}
