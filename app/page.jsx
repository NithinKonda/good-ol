import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
      <Link href='/play'>
        <button className="text-2xl bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          PLAY
        </button>
      </Link>
    </div>
  );
}