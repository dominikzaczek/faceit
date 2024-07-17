"use client"
import Link from "next/link";

import useAddAPost from "@/app/_hooks/useAddAPost";
import LoadingSpinner from "../LoadingSpinner";
import Post from "../Post";
import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";

export default function Feed() {
    const {sentinelRef, data, isError, isLoading, isSuccess, isFetching} = useInfiniteScroll()
    const imitatePost = useAddAPost();

    if(isLoading){
        return <LoadingSpinner />
    }

    if (isSuccess) {
        return (
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                <h3 className="text-black">This Feed uses React Query createApi. Go to <Link href="/reducer"><b>/reducer</b></Link> to alternative fetching</h3>
                {data?.posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                <div ref={sentinelRef} style={{ height: '1px' }}></div>
                {isFetching && <LoadingSpinner />}
            </div>
        )
    }

    if (isError) {
        return <div>Error loading posts.</div>;
      }
}
