import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IRickMorty, IRickMortyBase } from "../../dataTypes/interfaces/rickMorty";
// ___________________________________________________________

const RickMortyApi = createApi({
    reducerPath: "RickMortyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
    tagTypes: ['RickMortyApi'],

    endpoints: (builder) => ({

        getRickMorty: builder.query<IRickMortyBase, number|null>({
            query: (page) => `character/?page=${page}`,
            providesTags: ['RickMortyApi']

        })
    })
})

export default RickMortyApi

export const { useGetRickMortyQuery} = RickMortyApi