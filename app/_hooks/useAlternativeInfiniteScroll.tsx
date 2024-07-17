import { useEffect, useRef, useState } from 'react';
import { selectPosts, selectStatus, getPostsAsync, getInitialPostsAsync } from '@/lib/features/posts/postsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const useAlternativeInfiniteScroll = () => {
  const [skip, setSkip] = useState(0);
  const limit = Number(process.env.NEXT_PUBLIC_POST_LIMIT);
  const alternativeSentinelRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    // Fetch initial posts
    if (posts.posts.length === 0 && status === "idle") {
      dispatch(getInitialPostsAsync());
      setSkip(limit)
    }
  }, [dispatch, posts.posts.length, status, skip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && status !== "loading") {
          dispatch(getPostsAsync(skip));
          setSkip((prevSkip) => prevSkip + limit);
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = alternativeSentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [dispatch, status, skip, limit]);

  return { alternativeSentinelRef, status, posts };
};

export default useAlternativeInfiniteScroll;
