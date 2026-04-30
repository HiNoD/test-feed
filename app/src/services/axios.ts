import axios from 'axios';
import { PostsResponse, Post, CommentsResponse } from '../types/types';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: 'https://k8s.mectest.ru/test-app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer 550e8400-e29b-41d4-a716-446655440000` },
});

export const getPosts = async ({ pageParam, type, shouldError }: any): Promise<PostsResponse> => {
  try {
    const response = await apiClient.get(`/posts`,{
      params: {
        limit: 10,
        cursor: pageParam,
        tier: type === 'all' ? null : type,
        simulate_error: shouldError,
      }
    });
    return response.data.data;
  }
  catch (error: any) {
    throw error.response?.data;
  }
}

export const getPostById = async (id: string): Promise<Post> => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data.data.post;
  }
  catch (error: any){
    throw error.response?.data;
  }
}

export const getCommentsByPostId = async ({ id, pageParam }: any): Promise<CommentsResponse> => {
  try {
    const response = await apiClient.get(`/posts/${id}/comments`, {
      params: {
        id: id,
        limit: 10,
        cursor: pageParam,
      }
    });
    return response.data.data;
  }
  catch (error: any){
    throw error.response?.data;
  }
}

export const postCommentsByPostId = async (id: string): Promise<CommentsResponse> => {
  try {
    const response = await apiClient.post(`/posts/${id}/comments`);
    return response.data.data;
  }
  catch (error: any){
    throw error.response?.data;
  }
}

export const useLikeMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isLiked: boolean) => {
      const method = isLiked ? 'post' : 'delete';
      const { data } = await apiClient[method](`/posts/${postId}/like`);
      return data;
    },

    onMutate: async (newLikedStatus) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });

      const previousPost = queryClient.getQueryData(['post', postId]);

      queryClient.setQueryData(['post', postId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: newLikedStatus,
          likesCount: newLikedStatus 
            ? old.likesCount + 1 
            : old.likesCount - 1,
        };
      });

      return { previousPost };
    },

    onError: (err, newLikedStatus, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};

export const useCreateCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (text: string) => {
      const { data } = await apiClient.post(`/posts/${postId}/comments`, { text });
      return data;
    },

    onMutate: async (newCommentText) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousComments = queryClient.getQueryData(['comments', postId]);

      const tempComment = {
        id: `temp-${Date.now()}`,
        text: newCommentText,
        author: {
          id: 'me',
          displayName: 'Вы',
          avatarUrl: null,
        },
        createdAt: new Date().toISOString(),
        likesCount: 0,
      };

      queryClient.setQueryData(['comments', postId], (old: InfiniteData<any> | undefined) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                comments: [tempComment, ...page.comments],
              };
            }
            return page;
          }),
        };
      });

      return { previousComments };
    },

    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(['comments', postId], context.previousComments);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};


export default apiClient;