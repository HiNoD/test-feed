import { useQuery } from '@tanstack/react-query';
import { getPostById } from '../services/axios';
import { postsStore } from '../stores/postsStore';
import { useEffect } from 'react';

export const useSinglePost = (postId: string) => {
  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
    staleTime: 5 * 60 * 1000,
    enabled: !!postId, // Запрос не пойдет, если id пустой
  });

  useEffect(() => {
    if (query.data) {
      postsStore.setCurrentPost(query.data);
    }
  }, [query.data]);

  return query;
};