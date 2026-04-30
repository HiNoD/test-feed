import { useEffect } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { connectWS  } from '../utils/ws';

export const useRealtimeUpdates = (currentPostId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = connectWS((data) => {

      if (data.type === 'ping') {
        return;
      }

      if (data.postId !== currentPostId) return;

      switch (data.type) {
        case 'like_updated':
          console.log('update like');
          queryClient.setQueryData(['post', currentPostId], (old: any) => {
            if (!old) return old;
            return { ...old, likesCount: data.likesCount };
          });
          break;

        case 'comment_added':
          console.log('update comments');
          queryClient.setQueryData(['comments', currentPostId], (old: InfiniteData<any> | undefined) => {
            if (!old) return old;

            const exists = old.pages.some(page => 
              page.comments.some((c: any) => c.id === data.comment.id)
            );
            if (exists) return old;

            return {
              ...old,
              pages: old.pages.map((page, index) => 
                index === 0 
                  ? { ...page, comments: [data.comment, ...page.comments] }
                  : page
              ),
            };
          });
          break;
      }
    });

    return () => {
      socket.close();
    };
  }, [currentPostId, queryClient]);
};
