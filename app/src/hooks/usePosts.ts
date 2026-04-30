import { InfiniteData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPosts, getPostById } from '../services/axios';
import { ErrorResponse, Post, PostsResponse } from '../types/types';

export type PostType = 'all' | 'free' | 'paid';

export const usePosts = (type: PostType, shouldError: boolean) => {
  const query = useInfiniteQuery<PostsResponse, ErrorResponse, Post[], [string, PostType, {shouldError: boolean}], string>({
    queryKey: ['posts', type, { shouldError }],
    queryFn: ({ pageParam, queryKey }) => {
      const [_key, postType, { shouldError }] = queryKey;
      return getPosts({ pageParam, type: postType, shouldError });
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 5 * 60 * 1000,
    select: (data: InfiniteData<PostsResponse, string>) => 
      data.pages.flatMap((page) => page.posts),
    retry: false,
  });

  return query;
};

export const useSinglePost = (postId: string, post: Post) => {
  const query = useQuery<Post, Error, Post, (string | number)[]>({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    placeholderData: post,
    staleTime: 0,
  });

  return query;
}