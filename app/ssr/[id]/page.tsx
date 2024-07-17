
// This is the SSR version of the same component. I wanted to take advantage of NextJS's server-side components.
// Please refer to the Readme file for more details.

import Post from "@/app/_components/Post";
import PostType from "@/app/_types/post";

interface FetchPostResult {
    success: boolean;
    post?: PostType;
    message?: string;
}

async function fetchSinglePost(id: number): Promise<FetchPostResult> {
    try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        if (response.ok) {
            const data: PostType = await response.json();
            return { success: true, post: data };
        }
        return { success: false, message: "Data not found." };
    } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : String(error) };
    }
}

export default async function SinglePostSSC({ params }: { params: { id: number } }) {
    const data = await fetchSinglePost(params.id) 

    if(data.success){
        return <Post post={data.post!} />
    }

    return data.message

}