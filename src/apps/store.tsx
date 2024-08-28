import { configureStore } from "@reduxjs/toolkit";
import SliderSlice from "./services/SliderSlice";
import CartApi from "./services/CartApi";
import ReactQuizApi from "./services/ReactQuizApi";
import RickMortyApi from "./services/RickMortyApi";
// ___________________________________________________________

const store = configureStore({

  reducer: {
    SliderSlice: SliderSlice,
    [CartApi.reducerPath]:CartApi.reducer,
    [ReactQuizApi.reducerPath]:ReactQuizApi.reducer,
    [RickMortyApi.reducerPath]:RickMortyApi.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(CartApi.middleware,
    ReactQuizApi.middleware,
    RickMortyApi.middleware)
})


export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;

export default store;