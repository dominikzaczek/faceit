"use client"
import { render, screen } from "@testing-library/react";
import { useFetchAuthorQuery } from "../../../lib/features/posts/postsApiSlice"
import Author from './Author';

jest.mock('../../../lib/features/posts/postsApiSlice');

const mockUseFetchAuthorQuery = useFetchAuthorQuery as jest.Mock;

describe('Author Component', () => {
  beforeEach(() => {
    mockUseFetchAuthorQuery.mockReset();
  });


  it('renders loading state correctly', () => {
    mockUseFetchAuthorQuery.mockReturnValue({
      data: null,
      isError: false,
      isLoading: true,
      isSuccess: false,
    });

    render(<Author authorId={1} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders author information correctly when data is available', () => {
    const mockData = {
      image: 'https://dummyjson.com/icon/emilys/128',
      firstName: 'John',
    };

    mockUseFetchAuthorQuery.mockReturnValue({
      data: mockData,
      isError: false,
      isLoading: false,
      isSuccess: true,
    });

    render(<Author authorId={1} />);
    expect(screen.getByAltText('')).toHaveAttribute('src', mockData.image);
    expect(screen.getByText(mockData.firstName)).toBeInTheDocument();
  });

  it('renders nothing if there is an error', () => {
    mockUseFetchAuthorQuery.mockReturnValue({
      data: null,
      isError: true,
      isLoading: false,
      isSuccess: false,
    });

    const { container } = render(<Author authorId={1} />);
    expect(container.firstChild).toBeNull();
  });
});