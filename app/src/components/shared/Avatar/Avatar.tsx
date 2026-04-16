import React from 'react';
import { Image } from 'react-native';
import { Spacing } from '../../theme';

interface AvatarProps {
  uri: string,
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image source={{ uri: props.uri }} style={{width: 40, height: 40, borderRadius: 9999, margin: Spacing.md, marginTop: Spacing.xl, marginBottom: Spacing.xl}} />
  );
}

export default Avatar;