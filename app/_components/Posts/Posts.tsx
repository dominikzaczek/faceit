"use client"
import LoadingSpinner from "../LoadingSpinner"
import useInfiniteScroll from "@/app/_hooks/useInfiniteScroll";
import Post from "../Post/Post";

export default function Posts(){
    const {sentinelRef, data, isError, isLoading, isSuccess, isFetching} = useInfiniteScroll()

    if(isLoading){
        return <LoadingSpinner />
    }

    if (isSuccess) {
        return (
                <>
                {data?.posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                <div ref={sentinelRef} style={{ height: '1px' }}></div>
                {isFetching && <LoadingSpinner />}
                </>
        )
    }
}