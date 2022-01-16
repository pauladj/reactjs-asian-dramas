import { genericTMDBRequest } from "../../utils/requests";

async function fetchSearchTMDBData(queryParams) {
  const url = "search/tv";
  const { data, statusCode } = await genericTMDBRequest(
    url,
    "search api",
    queryParams
  );
  return { data, statusCode };
}

export default async function handler(req, res) {
  /**
   * /api/search
   */
  const queryParams = req.query;
  const { data, statusCode } = await fetchSearchTMDBData(queryParams);
  res.status(statusCode).json(data);
}
