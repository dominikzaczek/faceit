
// I was a little bit torn between pushing for Redux or simply fetching the data directly leaving the SinglePost
// as a Server-Side Component - I decided to do both. This page / component takes advantage of Redux hooks while
// wrapping the client component in a server-side page component. 

import PostDetails from "@/app/_components/PostDetails"

export default function SinglePost({params}:{params: {id:number}}){
    return <PostDetails id={params.id}/>
}