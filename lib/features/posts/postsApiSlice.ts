// features/posts/postsApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  userId: number;
};

type PostsApiResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export const postsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsApiResponse, { limit: number; skip: number }>({
      query: ({ limit = 20, skip = 0 }) =>
        `posts?limit=${limit}&skip=${skip}&select=id,title,body,tags,userId`,
      providesTags: (result, error, { skip }) => [
        { type: 'Posts', id: 'LIST', skip },
      ],
      serializeQueryArgs: ({ queryArgs }) => {
        const { skip, ...otherArgs } = queryArgs;
        return otherArgs;
      },
      merge: (currentCache, newResponse: PostsApiResponse) => {
        currentCache.posts.push(...newResponse.posts);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getSinglePost: build.query<Post, number>({
      query: (id) => `posts/${id}?select=id,title,body,tags,userId`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    fetchAuthor: build.query({
      query: (userId) => `users/${userId}`,
    }),
  }),

});

export const { useGetPostsQuery, useGetSinglePostQuery, useFetchAuthorQuery} = postsApiSlice;
