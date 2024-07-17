import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Challenge solution",
  description: "Provided by Dominik Zaczek",
};

function Content({children}:{children: React.ReactNode}){
  return <div className="mx-auto max-w-2xl">
  <Link href="/"><h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2></Link>
  <p className="mt-2 text-lg leading-8 text-gray-600">
    Learn how to grow your business with our expert advice.
  </p>
  <StoreProvider>{children}</StoreProvider>
</div>
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const limit = process.env.NEXT_PUBLIC_POST_LIMIT;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {limit ? <Content>{children}</Content> : <h2 className="text-black text-2xl">Please set up your NEXT_PUBLIC_POST_LIMIT variable in your .env.local file</h2>}
          </div>
        </div>
      </body>
    </html>
  );
}
