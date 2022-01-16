import React from "react";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title key="title">Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
    </>
  );
}
