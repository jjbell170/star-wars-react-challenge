import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Planet {
  name: string
  rotation_period: number
  orbital_period: number
  diameter: number
  climate: string
  gravity: string
  terrain: string
  surface_water: number
  population: number
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  characters: string[]
  planets: string[]
  starships: string[]
  vehicles: string[]
  species: string[]
  created: string
  edited: string
  url: string
}

export interface Person {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

const StarWarsAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi-new.herokuapp.com/api/', mode: 'cors' }),
  endpoints: (endpointBuilder) => ({
    getPeople: endpointBuilder.query<Person[], number | void>({
      query: (limit = 100) => `people/?limit=${limit}`,
      transformResponse: (response: { results: Person[] }) => response.results,
    }),
    getPerson: endpointBuilder.query<Person, string | number>({
      query: (id) => `people/${id}`,
    }),
    getFilm: endpointBuilder.query<Film, string | number>({
      query: (id) => `films/${id}`,
    }),
    getPlanet: endpointBuilder.query<Planet, string | number>({
      query: (id) => `planets/${id}`,
    }),
  }),
})

export default StarWarsAPI
