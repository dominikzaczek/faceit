import { render, screen } from '@testing-library/react';
import Feed from './Feed';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';
import useAddAPost from '@/app/_hooks/useAddAPost';
import Post from '../Post';

jest.mock('../../_hooks/useInfiniteScroll');
jest.mock('../../_hooks/useAddAPost');
jest.mock('../LoadingSpinner');
jest.mock('../Post');

describe('Feed component', () => {
  const mockUseInfiniteScroll = useInfiniteScroll as jest.Mock;
  const mockUseAddAPost = useAddAPost as jest.Mock;

  beforeEach(() => {
    mockUseAddAPost.mockReturnValue(jest.fn());
  });
  it('renders success state correctly', () => {
    const mockData = {
      posts: [
        { id: 1, userId: 1, title: 'Post 1', body: 'Body 1', tags: ['tag1'] },
        { id: 2, userId: 2, title: 'Post 2', body: 'Body 2', tags: ['tag2'] },
      ],
    };

    mockUseInfiniteScroll.mockReturnValue({
      sentinelRef: jest.fn(),
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
      isFetching: false,
    });

    render(<Feed />);

    expect(screen.getByText(/This Feed uses React Query createApi/i)).toBeInTheDocument();
    expect(Post).toHaveBeenCalledTimes(2);
    expect(Post).toHaveBeenCalledWith({ post: mockData.posts[0] }, {});
    expect(Post).toHaveBeenCalledWith({ post: mockData.posts[1] }, {});
  });


  it('renders error state correctly', () => {
    mockUseInfiniteScroll.mockReturnValue({
      sentinelRef: jest.fn(),
      data: null,
      isError: true,
      isLoading: false,
      isSuccess: false,
      isFetching: false,
    });

    render(<Feed />);

    expect(screen.getByText(/Error loading posts/i)).toBeInTheDocument();
  });
});
