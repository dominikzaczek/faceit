import React from 'react';
import PostTags from './PostTags';
import PostBody from './PostBody';
import Author from './Author';
import PostType from '@/app/_types/post';

export default function Post({ post }: { post: PostType }) {
  return (
    <article key={post.id} className="flex max-w-xl flex-col items-start justify-between" id={`${post.id}`}>
      <PostTags tags={post.tags} postId={post.id} />
      <PostBody post={post} />
      <Author authorId={post.userId} />
    </article>
  );
}
