

import Link from "next/link";
import Image from "next/image";

export default function Home() {


  return (
    <div className="bg-black text-white">
      <h1>GOOD OL</h1>
      <Image
        src='/logo.png' 
        alt="imag not dount"
        width={500}
      height={500}
      />
      <button className="text-slate-500 border-red-400">
        <Link href='/play'> PLAY </Link>
      </button>
    </div>
  );
}