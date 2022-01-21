import React from "react";
import Footer from "../components/Footer";
import Head from "next/head";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title key="title">Asian Dramas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
      <Footer />
    </>
  );
}
