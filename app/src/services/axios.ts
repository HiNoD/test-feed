import axios from 'axios';
import { PostsResponse, Post, ErrorResponse } from '../types/types';
import { QueryFunctionContext } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: 'https://k8s.mectest.ru/test-app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer 550e8400-e29b-41d4-a716-446655440000` },
});

export const getPosts = async ({ pageParam, shouldError }: any): Promise<PostsResponse> => {
  try {
    const response = await apiClient.get(`/posts`,{
      params: {
        limit: 10,
        cursor: pageParam,
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
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
}

export default apiClient;