import DramaHeader from "../components/DramaHeader";
import React from "react";
import DramaDetails from "../components/DramaDetails";
import { genericTMDBRequest } from "../utils/requests";
import castleHeaderBackground from "../public/img/castle-header-background.webp";
import CatalogueResultsItem from "../components/CatalogueResultsItem";
import { filterNonAsianResults } from "../hooks/useTMDB";
import Error from "./_error";
import Head from "next/head";

const DramaPage = ({ statusCode, dramaData }) => {
  if (statusCode !== 200) {
    return <Error statusCode={statusCode} />;
  }

  const backgroundImage = dramaData?.image
    ? "https://image.tmdb.org/t/p/original/" + dramaData.image
    : castleHeaderBackground.src;

  return (
    <>
      <Head>
        <title key="title">{dramaData.name}</title>
      </Head>
      <div
        className="bg-[left_top] bg-[length:1200px] lg:bg-cover min-h-screen bg-no-repeat	"
        style={{
          background: `linear-gradient(90deg, rgb(16, 24, 40) 10%, rgb(16 24 40 / 78%) 50%, rgb(22 32 54 / 21%) 99%),linear-gradient(0deg, rgb(16 24 40) 10%, rgb(22 32 54 / 0%) 99%), url('${backgroundImage}')`,
        }}
      >
        <DramaHeader />
        <main className="w-4/5 m-0 m-auto max-w-screen-xl">
          <article className="container mx-auto md:w-4/6 md:mx-0">
            <DramaDetails
              name={dramaData.name}
              countries={dramaData.countries}
              episodeCount={dramaData.episodeCount}
              firstAirDate={dramaData.firstAirDate}
              genres={dramaData.genres}
              plot={dramaData.plot}
              voteAverage={dramaData.voteAverage}
              watchLink={dramaData.watchLink}
            />
          </article>
          {dramaData.recommendations && (
            <aside>
              <h2 className="text-primary-50 text-sm font-medium mt-16">
                You May Also Like
              </h2>
              {dramaData.recommendations.length === 0 ? (
                <p className="mt-4">No recommendations found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
                  {dramaData.recommendations.map((drama) => (
                    <CatalogueResultsItem
                      key={drama.id}
                      id={drama.id}
                      voteAverage={drama.vote_average}
                      image={drama.poster_path}
                      firstAirDate={drama.first_air_date}
                      name={drama.name}
                      originalName={drama.original_name}
                    />
                  ))}
                </div>
              )}
            </aside>
          )}
        </main>
      </div>
    </>
  );
};

// This gets called on every request
export async function getServerSideProps(params) {
  const props = {
    statusCode: 500,
    dramaData: undefined,
  };

  try {
    const { pid } = params.query;

    const url = `tv/${pid}`;
    const { data, statusCode } = await genericTMDBRequest(
      url,
      "find tv by id api",
      { append_to_response: "recommendations" }
    );

    if (statusCode === 200 && data && data.name) {
      const asianTVRecommendations = filterNonAsianResults(
        data.recommendations
      );
      const threeRecommendations = asianTVRecommendations
        ? asianTVRecommendations.results.slice(0, 3)
        : [];

      props.dramaData = {
        name: data.name,
        image: data.backdrop_path,
        countries: data.origin_country,
        episodeCount: data.number_of_episodes,
        recommendations: threeRecommendations,
        genres: data.genres,
        voteAverage: data.vote_average,
        firstAirDate: data.first_air_date,
        plot: data.overview,
        watchLink: data.homepage,
      };
      props.statusCode = statusCode;
    } else if (statusCode !== 200) {
      props.statusCode = statusCode;
    }
  } catch (e) {
    props.statusCode = 500;
  }

  // Pass data to the page via props
  return { props: props };
}

export default DramaPage;
