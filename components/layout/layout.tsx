import { ReactNode } from 'react';

import Head from 'next/head';

import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children } : ReactNode) {
  return (
    <>
      <div className="flex flex-col h-screen justify-between">
        <Head>
          <title>Limbic code challenge </title>
          <meta name="description" content="Limbic code challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <main className="mb-auto h-screen p-5 bg-gray-100">{children}</main>

        <Footer />
      </div>
      <div />

    </>
  );
}
