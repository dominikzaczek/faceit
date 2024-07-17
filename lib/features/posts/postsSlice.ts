import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import PostType from "@/app/_types/post";

export interface PostsSliceState {
  posts: PostType[];
  status: "idle" | "loading" | "failed";
}

const initialState: PostsSliceState = {
  posts: [],
  status: "idle",
};

async function fetchPosts(limit:number = 20, skip:number){
  const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`)
  
  if(response.ok){
    const data = await response.json();
    return data;
  }
}

const limit = Number(process.env.NEXT_PUBLIC_POST_LIMIT);

export const postsSlice = createAppSlice({
  name: "alternativePosts",
  initialState,
  reducers: (create) => ({
    getInitialPostsAsync: create.asyncThunk(
      async () => {
        const response = await fetchPosts(limit, 0);
        return response.posts;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.posts = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    getPostsAsync: create.asyncThunk(
      async (skip: number) => {
        const response = await fetchPosts(5, skip);
        return response.posts;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          console.log("CHECK")
          state.status = "idle";
          state.posts = [...state.posts, ...action.payload];
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    unshiftAPost: create.reducer((state, action:PayloadAction<PostType>) => {
      state.posts.unshift(action.payload)
    }),
  }),
  selectors: {
    selectPosts: (posts) => posts,
    selectStatus: (state) => state.status,
  },
});

export const { getPostsAsync, getInitialPostsAsync, unshiftAPost } = postsSlice.actions;

export const { selectPosts, selectStatus } = postsSlice.selectors;