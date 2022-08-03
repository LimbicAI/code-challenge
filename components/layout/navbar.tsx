import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header
      style={{ backgroundColor: '#ffffffbf' }}
      className="h-14 m-3 text-gray-700 bg-lime-700 flex flex-row"
    >
      <div className="basis-10/12 cursor-pointer">
        <Link href="/">
          {/* <Image src="/limbic.svg" alt="limbic logo" width={100} height={24} /> */}
          test
        </Link>
      </div>

      <Link href="/questions">
        <a className="font-bold basis-1/12">Questions</a>
      </Link>

      <Link href="/answers">
        <a className="font-bold basis-1/12">Answers</a>
      </Link>
    </header>
  );
}
