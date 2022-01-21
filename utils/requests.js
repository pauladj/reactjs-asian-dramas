export const stringifyUrlParams = (params) => {
  let stringParams = "";

  const paramsKeys = Object.keys(params);
  paramsKeys.forEach((key) => {
    const value = params[key];
    if (value) {
      stringParams += `${key}=${value}&`;
    }
  });

  return stringParams;
};

export const genericTMDBRequest = async (url, apiName, queryParams) => {
  let returningStatusCode = 500;
  let returningData = "";
  const stringifyQueryParams = stringifyUrlParams(queryParams);
  try {
    const res = await fetch(
      `${process.env.TMDB_SERVER_URL}${url}?api_key=${process.env.TMDB_API_KEY}&language=en-US&${stringifyQueryParams}`
    );

    const statusCode = res.status;
    const data = await res.json();

    if (statusCode !== 200 || !data) {
      returningStatusCode = statusCode;
      throw new Error(`Invalid request ${res.status}`);
    }

    returningStatusCode = 200;
    returningData = data;
  } catch (e) {
    console.log(
      `Error using the TMDB ${apiName} with params ${stringifyQueryParams}: `,
      e
    );
  }

  return { data: returningData, statusCode: returningStatusCode };
};
