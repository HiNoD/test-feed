import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getPosts, getPostById } from '../services/axios';
import { postsStore } from '../stores/postsStore';
import { ErrorResponse, Post, PostsResponse } from '../types/types';
import { useEffect } from 'react';

export const usePosts = (shouldError: boolean) => {
  const query = useInfiniteQuery<PostsResponse, ErrorResponse, Post[], [string, {shouldError: boolean}], string>({
    queryKey: ['posts', { shouldError }],
    queryFn: ({ pageParam }) => getPosts({ pageParam, shouldError }),
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 5 * 60 * 1000,
    select: (data: InfiniteData<PostsResponse, string>) => 
      data.pages.flatMap((page) => page.posts),
    retry: false,
  });

  return query;
};