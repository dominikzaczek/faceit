// Post.test.tsx
import { render, screen } from '@testing-library/react';
import Post from './Post';
import PostTags from './PostTags';
import PostBody from './PostBody';
import Author from './Author';
import PostType from '@/app/_types/post';

jest.mock('./PostTags');
jest.mock('./PostBody');
jest.mock('./Author');

const mockPost: PostType = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post',
  tags: ['test', 'post'],
};

describe('Post component', () => {
  it('renders the Post component correctly', () => {
    render(<Post post={mockPost} />);

    // Check if PostTags is rendered
    expect(PostTags).toHaveBeenCalledWith({ tags: mockPost.tags, postId: mockPost.id }, {});

    // Check if PostBody is rendered
    expect(PostBody).toHaveBeenCalledWith({ post: mockPost }, {});

    // Check if Author is rendered
    expect(Author).toHaveBeenCalledWith({ authorId: mockPost.userId }, {});

    // Check if the article element has the correct id
    const articleElement = screen.getByRole('article');
    expect(articleElement).toBeInTheDocument();
    expect(articleElement).toHaveClass('flex max-w-xl flex-col items-start justify-between');
  });
});
