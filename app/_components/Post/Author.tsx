"use client"
import { useFetchAuthorQuery } from "@/lib/features/posts/postsApiSlice";
import LoadingSpinner from "../LoadingSpinner";

export default function Author({authorId}:{authorId:number}){
    const { data, isError, isLoading, isSuccess } = useFetchAuthorQuery(authorId);

    if(!authorId || isError) return null;

    if(isLoading) return <LoadingSpinner />;

    if(isSuccess){
        return <div className="relative mt-8 flex items-center gap-x-4">
        <img alt="" src={data.image} className="h-10 w-10 rounded-full bg-gray-50" />
        <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    {data.firstName}
            </p>
        </div>
    </div>
    }
   
}