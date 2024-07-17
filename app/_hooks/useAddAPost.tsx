import { AppDispatch, makeStore } from '@/lib/store';
import { postsApiSlice } from '@/lib/features/posts/postsApiSlice';
import PostType from '../_types/post';
import { useEffect } from 'react';
import { useDispatch, useStore, } from 'react-redux';

const newPost: PostType = {
  id: 999,
  title: 'Manually Added Post',
  body: 'This post was added manually.',
  tags: ['manual', 'test'],
  userId: 1,
};

export default function useAddAPost(){
  const store = useStore()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setTimeout(() => {
        dispatch(
            postsApiSlice.util.updateQueryData('getPosts', { limit: Number(process.env.NEXT_PUBLIC_POST_LIMIT), skip: 0 }, (state) => {
              state.posts.unshift(newPost)
            })
          );
    }, 5000)
}, [])

    return;
}