// import { postsApiSlice } from "./features/posts/postsApiSlice";
// import { Middleware } from '@reduxjs/toolkit';

// interface NewPost {
//   id: number;
//   title: string;
//   body: string;
//   tags: string[];
//   userId: number;
// }

// const websocketMiddleware: Middleware = () => {
//   let socket: WebSocket | null = null;

//   return store => next => action => {
//     if (postsApiSlice.endpoints.getPosts.matchFulfilled(action)) {
//       if (!socket) {
//         socket = new WebSocket('wss://example.com/posts'); // replace with your WebSocket URL

//         socket.onmessage = (event: MessageEvent) => {
//           const newPost: NewPost = JSON.parse(event.data);
//           store.dispatch(
//             postsApiSlice.util.updateQueryData('getPosts', { limit: 20, skip: 0 }, (draft) => {
//               draft.posts.unshift(newPost);
//             })
//           );
//         };

//         socket.onclose = () => {
//           console.log('WebSocket closed');
//         };
//       }
//     }

//     return next(action);
//   };
// };

// export default websocketMiddleware;