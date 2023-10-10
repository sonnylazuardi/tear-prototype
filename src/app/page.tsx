import TearButton from "@/components/TearButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-end font-mono text-sm lg:flex">
        <Link href="https://twitter.com/sonnylazuardi" className="underline">
          A prototype by Sonny
        </Link>
      </div>

      <div className="relative flex place-items-center">
        <TearButton title="Tear open"></TearButton>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
