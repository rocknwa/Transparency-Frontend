// pages/about.tsx
'use client';
import "../app/globals.css";
import { BackgroundAnimation } from '@/components/BackgroundAnimation';

const About = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100vh] overflow-hidden">
      <BackgroundAnimation />
      <div className="relative bg-white text-[#008751] p-12 rounded-lg shadow-lg max-w-4xl mx-auto mt-20 text-center z-10">
        <h1 className="text-4xl font-extrabold mb-8">About the Nigerian Voting System</h1>
        <p className="mb-6 text-2xl">
          The Nigerian Voting System is a secure, transparent, and efficient platform designed to facilitate fair elections in Nigeria. Our system leverages blockchain technology to ensure the integrity of the voting process.
        </p>
        <p className="mb-6 text-2xl">
          Key features of our voting system include:
        </p>
        <ul className="list-disc list-inside mb-6 text-xl">
          <li>Voter verification using government-issued IDs</li>
          <li>Secure and anonymous voting</li>
          <li>Real-time vote counting and results</li>
          <li>Protection against double voting</li>
          <li>Transparent and auditable election process</li>
        </ul>
        <p className="text-2xl">
          We are committed to upholding the democratic principles of Nigeria and ensuring that every eligible citizen has the opportunity to make their voice heard through their vote.
        </p>
      </div>
    </div>
  );
};

export default About;
