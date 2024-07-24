'use client';

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Leaderboard from "./components/Leaderboard";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-6xl font-bold mb-8 text-center">GOOD OL</h1>
      <div className="relative w-64 h-64 mb-8">
        <Image
          src='/logo.png'
          alt="Game logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <>
          <p className="mb-4">Welcome, {session.user.name}!</p>
          <Link href='/play'>
            <button className="text-2xl bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-4">
              PLAY
            </button>
          </Link>
          <button 
            onClick={() => signOut()}
            className="text-lg bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => signIn("google")}
            className="text-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-4"
          >
            Sign In with Google
          </button>
          <Link href='/play'>
            <button className="text-2xl bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mb-4">
              Play without Sign In
            </button>
          </Link>
        </>
      )}
      
      <button 
        onClick={() => setShowLeaderboard(!showLeaderboard)}
        className="text-xl bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-4"
      >
        {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>
      
      {showLeaderboard && <Leaderboard />}
    </div>
  );
}