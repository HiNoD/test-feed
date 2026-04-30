import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BorderRadius, CoreColors, Spacing } from '../../theme';
import Typography from '../Typography/Typography';
import * as Haptics from 'expo-haptics';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

interface ActionButtonProps {
  type: string;
  count: number;
  isLiked?: boolean;
  onPress?: () => void,
  isNeedBackground?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
  const {count, type, isLiked, onPress, isNeedBackground} = props;
  const scale = useSharedValue(1);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressBut = useCallback(() => {
    if (type === 'like') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      scale.value = withSequence(
        withSpring(1.3, { damping: 10, stiffness: 100 }), 
        withSpring(1)
      );
    }
    
    onPress && onPress();
  },[type, onPress])

  return (
    <TouchableOpacity onPress={onPressBut} style={[styles.button, {backgroundColor: isNeedBackground ? isLiked ? CoreColors.pinkDefault : CoreColors.greyDefault : undefined}]}>
      <Animated.View style={type === 'like' ? animatedIconStyle : null}>
        {type === 'like' ? (
          <FontAwesome5 
            name="heart" 
            size={16} 
            solid={isLiked}
            color={isLiked ? CoreColors.numberSecondary : CoreColors.numbersPrimary}
          />
        ) : (
          <FontAwesome 
            name="comment" 
            size={16} 
            color={CoreColors.numbersPrimary} 
          />
        )}
      </Animated.View>
      <Typography text={count?.toString()} type={'number'} color={isLiked ? CoreColors.numberSecondary : CoreColors.numbersPrimary}/>
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