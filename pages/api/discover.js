import { genericTMDBRequest } from "../../utils/requests";

async function fetchDiscoverTMDBData(queryParams) {
  const url = "discover/tv";
  const { data, statusCode } = await genericTMDBRequest(
    url,
    "discover api",
    queryParams
  );
  return { data, statusCode };
}

export async function getMostPopularKoreanDramas() {
  const queryParams = {
    sort_by: "popularity.desc",
    with_original_language: "ko",
    with_type: 4,
  };
  const { data, statusCode } = await fetchDiscoverTMDBData(queryParams);
  return { data, statusCode };
}

export default async function handler(req, res) {
  /**
   * /api/discover
   */
  const queryParams = req.query;
  const { data, statusCode } = await fetchDiscoverTMDBData(queryParams);
  res.status(statusCode).json(data);
}
