import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { postsApiSlice } from "./features/posts/postsApiSlice";
import { lastSeenPostSlice } from "./features/lastSeenPost/lastSeenPostSlice";
import { postsSlice } from "./features/posts/postsSlice";
// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(postsApiSlice, postsSlice, lastSeenPostSlice);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(postsApiSlice.middleware);
    },
  });
};
console.log("MAKESTORE", makeStore())

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
