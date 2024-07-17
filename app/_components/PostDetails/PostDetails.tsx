"use client"

import { useGetSinglePostQuery } from "@/lib/features/posts/postsApiSlice";
import Post from "../Post/Post";
import LoadingSpinner from "../LoadingSpinner";

export default function PostDetails({ id }: { id: number }) {
    const { data, isSuccess, isError, isLoading } = useGetSinglePostQuery(id)

    
    if(isLoading){
        return <LoadingSpinner />
    }

    if (isSuccess) {
        return <Post post={data} />
    }

    if(isError){
        return "Error loading the post"
    }
    return null;
}