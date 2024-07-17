/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import PostTags from "./PostTags";

it('renders the correct number of tags', () => {
  const tags = ['React', 'JavaScript', 'TypeScript'];
  render(<PostTags tags={tags} postId={3}/>);

  const tagElements = screen.getAllByText(/(React|JavaScript|TypeScript)/);
  expect(tagElements).toHaveLength(tags.length);
});

it('renders the correct tag content', () => {
  const tags = ['React', 'JavaScript', 'TypeScript'];
  render(<PostTags tags={tags} postId={3}/>);

  tags.forEach((tag) => {
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
});

it('applies the correct classes to the tags', () => {
  const tags = ['React', 'JavaScript', 'TypeScript'];
  render(<PostTags tags={tags} postId={3}/>);

  const tagElements = screen.getAllByText(/(React|JavaScript|TypeScript)/);
  tagElements.forEach((tagElement) => {
    expect(tagElement).toHaveClass('relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100');
  });
});
