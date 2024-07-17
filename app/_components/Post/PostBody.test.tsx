import { render, screen } from '@testing-library/react';
import PostBody from './PostBody';
import PostType from '@/app/_types/post';

const mockPost: PostType = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post body',
  tags: ['test', 'post'],
};

describe('PostBody component', () => {
  it('renders the post title correctly', () => {
    render(<PostBody post={mockPost} />);
    const titleElement = screen.getByText(mockPost.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the post body correctly', () => {
    render(<PostBody post={mockPost} />);
    const bodyElement = screen.getByText(mockPost.body);
    expect(bodyElement).toBeInTheDocument();
  });

  it('renders the link correctly', () => {
    render(<PostBody post={mockPost} />);
    const linkElement = screen.getByRole('link', { name: mockPost.title });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/post/${mockPost.id}`);
  });
});
