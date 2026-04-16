import React from 'react';
import { TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { BorderRadius, CoreColors, Spacing } from '../../theme';
import Typography from '../Typography/Typography';

interface ButtonProps extends ViewProps {
  text: string;
  onPress?: () => void,
}

const Button = (props: ButtonProps) => {
  const {text, onPress, style} = props;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Typography color={CoreColors.white} text={text} type={'textButton'}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    backgroundColor: CoreColors.purpleDefault,
    width: 239,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: Spacing.md,
  }
});

export default Button;