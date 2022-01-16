import React from "react";
import HeroHeader from "../components/HeroHeader";
import Catalogue from "../components/Catalogue";
import MostPopularKoreanShows from "../components/MostPopularKoreanShows";
import GoUpButton from "../components/GoUpButton";
import { getTrendingKoreanTVShows } from "./api/discover";

export default function Home({ tvShows, hasError }) {
  return (
    <>
      <HeroHeader />
      <main className="w-4/5 m-0 m-auto max-w-screen-xl relative">
        <GoUpButton />
        <article className="container mx-auto relative">
          <aside className="hidden lg:block">
            <MostPopularKoreanShows tvShows={tvShows} hasError={hasError} />
          </aside>
          <Catalogue />
        </article>
      </main>
    </>
  );
}

// Get most popular korean tv shows
export async function getServerSideProps() {
  const props = {
    tvShows: null,
    hasError: false,
  };

  try {
    const { data, statusCode } = await getTrendingKoreanTVShows();

    if (!data || statusCode !== 200) {
      props.hasError = true;
    } else {
      props.tvShows = data.results || [];
    }
  } catch (e) {
    props.hasError = true;
  }
  return { props: props };
}
