import PostType from "@/app/_types/post"
import Link from "next/link"

export default function PostBody({ post }: { post: PostType }) {
    return <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/post/${post.id}`} passHref style={{ cursor: "pointer" }}>
                <span className="absolute inset-0" />
                {post.title}
            </Link>
        </h3>
        <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600">{post.body}</p>
    </div>
}