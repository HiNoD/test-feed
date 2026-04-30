// src/features/posts/components/PostCard.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { postsStore } from '@/app/src/stores/postsStore';
import { Post } from '@/app/src/types/types';
import Avatar from '../../../shared/Avatar/Avatar';
import ActionButton from '../../../shared/ActionButton/ActionButton';
import { BorderRadius, CoreColors, Spacing } from '../../../theme';
import ImagePost from '../../../shared/ImagePost/ImagePost';
import Typography from '../../../shared/Typography/Typography';
import { Skeleton } from '../../../shared/Skeleton/Skeleton';
import { useLikeMutation } from '@/app/src/services/axios';

interface PostCardProps {
  post: Post;
  onPress?: () => void;
  isDetail?: boolean;
}

const PostCard = observer((props: PostCardProps) => {
  const { post, onPress, isDetail } = props;
  const [isNeedOpenMore, setIsNeedOpenMore] = useState<boolean>(post.preview?.length > 120 ? true : false);
  const [isOpenedMore, setIsOpenedMore] = useState<boolean>(false);
  const mutation = useLikeMutation(post.id);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        {post.author?.avatarUrl && <Avatar uri={post.author.avatarUrl}/>}
        <View style={styles.avatarName}>
          <Typography color={CoreColors.textPrimary} text={post.author?.displayName} type={'avatar'}/>
        </View>
      </View>
      {post.coverUrl && (
        <View style={styles.cover}>
          <ImagePost uri={post.coverUrl} tier={post.tier}/>
        </View>
      )}

      {post.tier === 'free' ? 
        <>
          <View style={styles.title}>
            <Typography text={post.title} type={'title'} color={CoreColors.textPrimary}/>
          </View>
          {!isOpenedMore && !isDetail ? 
            <Text style={styles.body} numberOfLines={3}>
              {post.preview}{isNeedOpenMore ? <Text onPress={() => setIsOpenedMore(!isOpenedMore)} style={{color: CoreColors.purpleDefault}}>{'Показать еще'}</Text> : <></>}
            </Text> :
            <Text style={styles.body}>
              {post.body}
            </Text>
          }
          {isDetail && <Text style={styles.body}>
              {post.body}
            </Text>}
        </>
        : 
        <Skeleton />
      }

      <View style={styles.footer}>
        <ActionButton type={'like'} count={post.likesCount} isLiked={post.isLiked} onPress={() => mutation.mutate(!post.isLiked)} isNeedBackground={true}/>
        <View style={styles.commentIcon}>
          <ActionButton type={'comment'} count={post.commentsCount} isNeedBackground={true}/>
        </View>
      </View>

    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarName: {
    width: 96,
    height: 20,
    margin: Spacing.md,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  cover: {
    width: '100%',
    height: 393,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  title: {
    marginBottom: Spacing.md,
    marginLeft: Spacing.xl,
    marginTop: Spacing.md,
  },
  body: {
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 20,
    color: CoreColors.textPrimary,
    marginBottom: Spacing.lg,
    marginLeft: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
    marginLeft: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  commentIcon: {
    marginLeft: Spacing.md,
  },
});

export default PostCard;
