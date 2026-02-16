import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Item } from 'types';
import { Character } from 'components/SearchPage/CharacterDetails/CharacterDetails';

interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
  };
  results: ApiCharacter[];
}

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { items: Item[]; totalPages: number },
      { name?: string; page?: number }
    >({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        if (name) params.set('name', name);
        if (page) params.set('page', page.toString());
        return `character/?${params.toString()}`;
      },
      transformResponse: (response: ApiResponse) => {
        const items: Item[] = response.results.map((item) => ({
          id: item.id,
          name: item.name,
          overview: `${item.status === 'unknown' ? 'Unknown' : item.status} - ${item.species}`,
          image: item.image,
        }));
        return { items, totalPages: response.info.pages };
      },
    }),
    getCharacterById: builder.query<Character, { characterId: string }>({
      query: ({ characterId }) => {
        console.log(characterId);
        return `character/${characterId}`;
      },
    }),
    getEpisodeByUrl: builder.query<{ name: string }, string>({
      query: (url) => url.replace('https://rickandmortyapi.com/api/', ''),
      transformResponse: (response: { name: string }) => ({
        name: response.name,
      }),
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterByIdQuery,
  useGetEpisodeByUrlQuery,
} = rickAndMortyApi;
