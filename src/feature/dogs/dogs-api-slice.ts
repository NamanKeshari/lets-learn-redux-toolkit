import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DOGS_API_KEY =
  "live_NlGafkULBlGZozsIk1LsCiFYerP1QucuZytBi065AznRy1Pqszlbz2ubvYddvvBk";

interface Breed {
  id: string;
  url: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1/images",
    prepareHeaders(headers) {
      headers.set("x-api-key", DOGS_API_KEY);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchBreed: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/search?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedQuery } = apiSlice;
