import { useEffect, useRef, useState } from 'react';
import { useGetPostsQuery } from '@/lib/features/posts/postsApiSlice';

const useInfiniteScroll = () => {
  const [skip, setSkip] = useState(0);
  const limit = Number(process.env.NEXT_PUBLIC_POST_LIMIT); // Fixed limit per page
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, isError, isLoading, isSuccess, isFetching } = useGetPostsQuery({ limit, skip });

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && !isLoading) {
          setSkip((prevSkip) => prevSkip + limit);
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

   
    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [isLoading, limit]);

  return { sentinelRef, data, isError, isLoading, isSuccess, isFetching };
};

export default useInfiniteScroll;
