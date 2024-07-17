import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { postsApiSlice } from "./features/posts/postsApiSlice";
import { lastSeenPostSlice } from "./features/lastSeenPost/lastSeenPostSlice";
import { postsSlice } from "./features/posts/postsSlice";

const rootReducer = combineSlices(postsApiSlice, postsSlice, lastSeenPostSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(postsApiSlice.middleware);
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
