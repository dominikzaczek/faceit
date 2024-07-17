export default function PostTags({ tags, postId }: { tags: string[], postId: number }) {
    return <div className="flex items-center gap-x-4 text-xs">
        {tags.map((tag, index) => {
            return <span key={`tag-${postId}-${index}`}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
                {tag}
            </span>
        })}
    </div>
}