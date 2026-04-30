import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { getCommentsByPostId } from '../services/axios';
import { CommentsResponse, ErrorResponse, Comment } from '../types/types';

export const useComments = (postId: string) => {
  const query =  useInfiniteQuery<
    CommentsResponse, 
    ErrorResponse, 
    Comment[],
    [string, string],
    string | null
  >({
    queryKey: ['comments', postId],
    queryFn: ({ pageParam }) => getCommentsByPostId({ id: postId, pageParam }),
    
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    select: (data: InfiniteData<CommentsResponse, string | null>) => 
      data.pages.flatMap((page) => page.comments),
    staleTime: 1000 * 60,
  });

  return query;
};