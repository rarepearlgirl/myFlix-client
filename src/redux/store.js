import { configureStore } from "@reduxjs/toolkit";
import DirectorsReducer from "./reducers/directors";
import GenresReducer from "./reducers/genres";
import MoviesReducer from "./reducers/movies";
import UsersReducer from "./reducers/users";

export const store = configureStore({
  reducer: { directors: DirectorsReducer, genres: GenresReducer, movies: MoviesReducer, user: UsersReducer }
});