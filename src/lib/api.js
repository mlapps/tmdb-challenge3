import { Entity } from "./models";
const headers = {
  Accept: "application/json"
};
const apiKey = `66683917a94e703e14ca150023f4ea7c`;
let stage;

export const init = stageInstance => {
  stage = stageInstance;
};

const remapGenres = ({ genres }) =>
  genres.reduce((map, { id, name }) => ({ ...map, [id]: name }), {});

const get = url => fetch(url, { headers }).then(response => response.json());

export const getMovies = async () => {
  const movies = await get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );
  const genres = await get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
  );
  const results = movies.results || [];

  return results.map(data => new Entity(data, remapGenres(genres)));
};

export const getSeries = async () => {
  const series = await get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
  );
  const genres = await get(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
  );
  const results = series.results || [];

  return results.map(data => new Entity(data, remapGenres(genres)));
};

export const getDetailedMovie = async movieId => {
  const data = await get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  );
  return new Entity(data, remapGenres(data));
};

export const getDetailedSerie = async serieId => {
  const data = await get(
    `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}`
  );
  return new Entity(data, remapGenres(data));
};
