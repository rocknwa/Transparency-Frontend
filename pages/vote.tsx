// imports
import "../app/globals.css";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { AlchemyAccountProvider, createConfig, useAccount } from "@account-kit/react";
import { ethers } from 'ethers';
import { arbitrumSepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Background } from "@/components/Background";

const queryClient = new QueryClient();

const alchemyConfig = createConfig({
  transport: alchemy({ apiKey: 'M6k3Rlnvks6m2ZGnxo-wMv_UpemW_bGJ' }), // Replace with your Alchemy API key
  chain: arbitrumSepolia,
  ssr: true,
  enablePopupOauth: true,
});

function InnerVotePage() {
  const { account } = useAccount({ type: 'LightAccount' });
  const [candidateIndex, setCandidateIndex] = useState<number | null>(null);
  const [votingStatus, setVotingStatus] = useState<string | null>(null);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);
  const [leadingCandidate, setLeadingCandidate] = useState({ name: "", votes: 0 });

  const contractAbi = [
    "function vote(uint256 _candidateNumber) public",
    "function getCandidates() public view returns (string[] memory, uint[] memory)",
    "function getVotes() public view returns (string[] memory, uint[] memory)",
    "function getLeadingCandidate() public view returns (string memory, uint)"
  ];

  useEffect(() => {
    if (account !== undefined) {
      setLoadingAccount(false);
      if (account === null) {
        window.location.href = '/';
      }
    }
  }, [account]);

  const handleVote = async () => {
    if (candidateIndex === null || candidateIndex <= 0 || candidateIndex > 99999) {
      setVotingStatus("Please enter a valid candidate index between 1 and 99999.");
      return;
    }

    const isConfirmed = window.confirm(
      `You are about to vote for candidate number ${candidateIndex}. Please confirm your choice.`
    );

    if (!isConfirmed) {
      setVotingStatus("Vote canceled.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        '0xEd27133B24A9cDf08E2a9F05D4ba2B5f323E2dE1', // Replace with actual contract address
        contractAbi,
        signer
      );
      const tx = await contract.vote(candidateIndex);
      await tx.wait();
      setVotingStatus("Vote cast successfully!");
    } catch (error) {
      setVotingStatus("Error casting vote. Please try again.");
      console.error("Error voting:", error);
    }
  };

  const fetchCandidates = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract('0xEd27133B24A9cDf08E2a9F05D4ba2B5f323E2dE1', contractAbi, provider);
      const [names, indexes] = await contract.getCandidates();
      const candidatesData = names.map((name, i) => ({ name, index: indexes[i] }));
      setCandidates(candidatesData);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchVotes = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract('0xEd27133B24A9cDf08E2a9F05D4ba2B5f323E2dE1', contractAbi, provider);
      const [names, voteCounts] = await contract.getVotes();
      const votesData = names.map((name, i) => ({ name, votes: voteCounts[i] }));
      setVotes(votesData);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  const fetchLeadingCandidate = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract('0xEd27133B24A9cDf08E2a9f05D4ba2B5f323E2dE1', contractAbi, provider);
      const [name, votes] = await contract.getLeadingCandidate();
      setLeadingCandidate({ name, votes });
    } catch (error) {
      console.error("Error fetching leading candidate:", error);
    }
  };

  if (loadingAccount) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-green-700 dark:text-green-400">
      <div className="absolute inset-0 -z-10">
        <Background />
      </div>
      <div className="flex flex-col items-center justify-center z-10 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Cast Your Vote</h1>
        
        {/* Voting Instructions */}
        <p className="text-lg mb-4 text-center max-w-xl">
          Welcome to the voting portal! To cast your vote, please enter the index number of your chosen candidate.
        </p>
        
        <input
          type="number"
          value={candidateIndex !== null ? candidateIndex : ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0 && value <= 99999) {
              setCandidateIndex(value);
            }
          }}
          min="1"
          max="99999"
          maxLength={5}
          placeholder="Candidate Index"
          className="border p-3 text-xl mb-6 rounded-md w-64 text-center"
        />
        
        <Button 
          onClick={handleVote} 
          className="bg-green-600 hover:bg-green-700 text-white text-2xl px-8 py-4 rounded-md mb-4"
        >
          Submit Vote
        </Button>
        
        {votingStatus && <p className="mt-6 text-xl text-center font-semibold">{votingStatus}</p>}

        {/* View Candidates */}
        <Button onClick={fetchCandidates} className="mt-6">View Candidates</Button>
        <ul className="mt-4">
          {candidates.map((candidate, index) => (
            <li key={index}>{candidate.index}. {candidate.name}</li>
          ))}
        </ul>

        {/* Check Votes */}
        <Button onClick={fetchVotes} className="mt-6">Check Votes</Button>
        <ul className="mt-4">
          {votes.map((candidate, index) => (
            <li key={index}>{candidate.name}: {candidate.votes} votes</li>
          ))}
        </ul>

        {/* Leading Candidate */}
        <Button onClick={fetchLeadingCandidate} className="mt-6">Get Leading Candidate</Button>
        {leadingCandidate.name && (
          <p className="mt-4">Leading Candidate: {leadingCandidate.name} with {leadingCandidate.votes} votes</p>
        )}
      </div>
    </div>
  );
}

export default function VotePage() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider config={alchemyConfig} queryClient={queryClient}>
        <InnerVotePage />
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}
