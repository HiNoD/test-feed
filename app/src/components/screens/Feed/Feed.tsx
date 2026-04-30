import React, { useState } from 'react';
import { PostType, usePosts } from "@/app/src/hooks/usePosts";
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Switch, Image } from "react-native";
import PostCard from './PostCard/PostCard';
import Button from '../../shared/Button/Button';
import Typography from '../../shared/Typography/Typography';
import { CoreColors, Spacing } from '../../theme';
import { useQueryClient } from '@tanstack/react-query';
import { FeedFilters } from './FeedFilters/FeedFilters';
import { useRouter } from 'expo-router';

const FeedScreen = observer(() => {
  const [isErrorMode, setIsErrorMode] = useState(false);
  const [filter, setFilter] = useState<PostType>('all');
  const queryClient = useQueryClient();
  const { 
    data: posts,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    refetch, 
    isRefetching,
    isLoading,
    isError,
    error,
  } = usePosts(filter, isErrorMode);
  const sourceImage = require('../../../images/illustration.png');

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const router = useRouter();

  const onRefresh = async () => {
    await queryClient.resetQueries({ queryKey: ['posts'] });
    refetch();
  };

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <View style={styles.debugPanel}>
        <Text style={styles.debugText}>
          {isErrorMode ? "🔴 Режим ошибки" : "🟢 Режим ленты"}
        </Text>
        <Switch 
          value={isErrorMode} 
          onValueChange={(val) => setIsErrorMode(val)} 
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : isError ? (
        <View style={styles.center}>
          <Image source={sourceImage} style={styles.errorImage} />
          <Typography text={'Не удалось загрузить публикации'} type={'title'} color={CoreColors.textPrimary}/>
          <Button text={'Повторить'} onPress={() => refetch()} style={styles.button}/>
        </View>
      ) : (
        <>
          <FeedFilters active={filter} onChange={setFilter} />
          <FlatList 
            data={posts}
            keyExtractor={item => item.id}
            renderItem={({item}) => <PostCard post={item} onPress={() => router.push({
              pathname: `/src/components/screens/Feed/PostDetails/PostDetails`,
              params: {
                postId: item.id,
                post: JSON.stringify(item),
              }
            })}/>}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh}/>}
            ListHeaderComponent={isFetchingNextPage && !isLoading ? <ActivityIndicator /> : null}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
            refreshing={false}
          />
        </>
      )}      
    </View>
  );
});

const styles = StyleSheet.create({
  debugPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  debugText: { 
    fontWeight: 'bold',
  },
  center: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorImage: {
    width: 120,
    height: 120
  },
  button: {
    width: 360,
    height: 42,
    marginTop: Spacing.xl
  },
});

export default FeedScreen;