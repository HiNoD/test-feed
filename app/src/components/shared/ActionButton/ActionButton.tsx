import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BorderRadius, CoreColors, Spacing } from '../../theme';
import Typography from '../Typography/Typography';

interface ActionButtonProps {
  type: string;
  count: number;
  isLiked?: boolean;
  onPress?: () => void,
}

const ActionButton = (props: ActionButtonProps) => {
  const {count, type, isLiked, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, {backgroundColor: isLiked ? CoreColors.pinkDefault : CoreColors.greyDefault}]}>
      {type === 'like' ? 
        <FontAwesome5 name="heart" size={16} color={isLiked ? CoreColors.numberSecondary : CoreColors.numbersPrimary}/>
        : 
        <FontAwesome name="comment" size={16} color={CoreColors.numbersPrimary} />
      }
      <Typography text={count.toString()} type={'number'} color={isLiked ? CoreColors.numberSecondary : CoreColors.numbersPrimary}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.full,
    width: 63,
    height: 36,
    padding: Spacing.sm,
    paddingRight: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: Spacing.xs,
  }
});

export default ActionButton;