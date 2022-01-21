import Button from "../components/Button";
import BackgroundDecorations from "../components/BackgroundDecorations";
import React from "react";

function Error({ statusCode }) {
  return (
    <div className="bg-hero-background bg-top bg-[length:1200px] lg:bg-cover sm:relative min-h-[85vh]">
      {/* decorations */}
      <BackgroundDecorations />
      {/* end */}

      <div className="w-4/5 m-0 m-auto max-w-screen-xl font-bold text-center text-white container mx-auto">
        <h1 className="text-2xl pt-36 md:pt-48">
          {statusCode === 404 ? statusCode : 500}
        </h1>

        <p className="pt-4 text-md text-primary-400 block">
          {statusCode === 404 ? `Page Not found` : "Server error"}
        </p>

        <Button link="/" customClasses="mx-auto">
          Go Home
        </Button>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
