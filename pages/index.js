import React from "react";
import HeroHeader from "../components/HeroHeader";
import Catalogue from "../components/Catalogue";
import MostPopularKoreanDramas from "../components/MostPopularKoreanDramas";
import GoUpButton from "../components/GoUpButton";
import { getMostPopularKoreanDramas } from "./api/discover";

export default function Home({ mostPopularKoreanDramas, statusCode }) {
  const mostPopularDramasLoaded = statusCode === 200;

  return (
    <>
      <HeroHeader />
      <main className="w-4/5 m-0 m-auto max-w-screen-xl relative">
        <GoUpButton />
        <article className="container mx-auto relative">
          <aside className="hidden lg:block">
            <MostPopularKoreanDramas
              dramas={mostPopularKoreanDramas}
              hasError={!mostPopularDramasLoaded}
            />
          </aside>
          <Catalogue />
        </article>
      </main>
    </>
  );
}

// Get most popular korean dramas
export async function getServerSideProps() {
  const props = {
    mostPopularKoreanDramas: undefined,
    statusCode: 500,
  };

  try {
    const { data, statusCode } = await getMostPopularKoreanDramas();

    if (statusCode === 200 && data && data.results) {
      props.mostPopularKoreanDramas = data.results || [];
      props.statusCode = statusCode;
    } else if (statusCode !== 200) {
      props.statusCode = statusCode;
    }
  } catch (e) {
    props.statusCode = 500;
  }
  return { props: props };
}
