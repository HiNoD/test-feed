import { View, FlatList, StyleSheet, ActivityIndicator, Text, Platform, KeyboardAvoidingView } from 'react-native';
import PostCard from '../PostCard/PostCard';
import { CommentItem } from '../../../shared/Comment/Comment';
import { CommentInput } from '../../../shared/Input/Input';
import { useSinglePost } from '@/app/src/hooks/usePosts';
import { useComments } from '@/app/src/hooks/useComments';
import { useLocalSearchParams } from 'expo-router';
import { useRealtimeUpdates } from '@/app/src/hooks/useRealtimeUpdates';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCreateCommentMutation } from '@/app/src/services/axios';
import { useRef } from 'react';

const PostDetailsScreen = () => {
  const { postId, item } = useLocalSearchParams();
  const postData = item ? JSON.parse(item as string) : null;
  const safePostId = Array.isArray(postId) ? postId[0] : postId;
  const { mutate: addComment, isPending } = useCreateCommentMutation(safePostId);
  useRealtimeUpdates(String(postId));
  const { data: post, isLoading: isLoadingPost} = useSinglePost(safePostId, postData);
  const {
    data: comments,
    isLoading: isLoadingComments,
    isFetching: isFetchingCom,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
  } = useComments(safePostId);
  const flatListRef = useRef<FlatList>(null);

  const isLoading = isLoadingPost || isLoadingComments;

  if (isLoading && !post) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const handleCommentSend = (text: string) => {
    addComment(text, {
    onSuccess: () => {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }, 100);
    }
  });
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={60}
      >
        <FlatList
          ref={flatListRef}
          data={comments || []}
          keyExtractor={(item) => item.id}
          extraData={post}
          ListHeaderComponent={
            post ? <PostCard post={post} isDetail={true} /> : null
          }
          renderItem={({ item }) => <CommentItem comment={item} />}
          ListEmptyComponent={
            !isFetchingCom ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: 'gray' }}>
                {'Комментариев пока нет'}
              </Text>
            ) : null
          }
          ListFooterComponent={
            isFetchingCom ? <ActivityIndicator style={{ margin: 10 }} /> : null
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        />
        <CommentInput onSend={handleCommentSend} />
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: -56 }
});

export default PostDetailsScreen;