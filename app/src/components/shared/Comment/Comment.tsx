import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from '../ActionButton/ActionButton';
import Avatar from '../Avatar/Avatar';
import { Comment } from '../../../types/types';

interface CommentProps {
  comment: Comment;
}

export const CommentItem = (props: CommentProps) => {
  const { comment } = props;

  return (
    <View style={styles.container}>
      {comment.author.avatarUrl && <Avatar uri={comment.author.avatarUrl}/>}

      <View style={styles.content}>
        <Text style={styles.username}>{comment.author.displayName}</Text>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>

      <ActionButton type={'like'} count={Math.floor(Math.random() * 100)} isLiked={!Math.random()} isNeedBackground={false}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginHorizontal: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  likeSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
  },
  likeCount: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  likedText: {
    color: '#FF3B30',
  },
});