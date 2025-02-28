import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonInterface } from "./type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getPokemon: builder.query<{ results: PokemonInterface[], next: string | null }, { offset: number, limit: number }>({
      query: ({ offset, limit }) => `/pokemon?offset=${offset}&limit=${limit}`,
      serializeQueryArgs: ({ endpointName }) => endpointName, 
      merge: (currentCache, newData) => {
        currentCache.results.push(...newData.results);
        currentCache.next = newData.next; 
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    //  fetch by id
    getPokemonById: builder.query<PokemonInterface, number>({
      query: (id) => `/pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonQuery, useGetPokemonByIdQuery } = pokemonApi;
