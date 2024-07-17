import { useEffect } from "react"
import { unshiftAPost } from "@/lib/features/posts/postsSlice"
import { useAppDispatch } from "@/lib/hooks"
import PostType from "../_types/post";

const newPost: PostType = {
    id: 999,
    title: 'Manually Added Post',
    body: 'This post was added manually.',
    tags: ['manual', 'test'],
    userId: 1,
  };

export default function useAlternativeAddPost(){
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(unshiftAPost(newPost))
        }, 5000)
    }, [])
    
}