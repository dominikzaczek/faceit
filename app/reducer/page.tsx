"use client"
import useAlternativeInfiniteScroll from "../_hooks/useAlternativeInfiniteScroll";
import Post from "../_components/Post";
import Link from "next/link";
import useAlternativeAddPost from "../_hooks/useAlternativeAddPost";


// An alternative solution using reducers and selectors rather than automatically generated hooks by createApi
// Since createApi has proven to be challenging in some use cases, I decided to try the other approach
// Please refer to Readme file for more details

export default function AlternativeHomepage(){
    const {posts, status, alternativeSentinelRef } = useAlternativeInfiniteScroll();
    const addPost = useAlternativeAddPost();
   
        return <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                <h3 className="text-black">This Feed uses Posts Slice. Go to <Link href="/"><b>homepage</b></Link> to see how createApi handles the same task.</h3>
                {posts.posts.map((post) => (
                    <Post post={post} key={post.id} />
                ))}
                <div ref={alternativeSentinelRef} style={{ height: '1px' }}></div>
            </div>
}