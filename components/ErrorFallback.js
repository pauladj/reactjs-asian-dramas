import Error from "../pages/_error";
import React from "react";

export default function ErrorFallback() {
  return <Error statusCode={500} />;
}
