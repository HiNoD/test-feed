import React from 'react';
import { Text, ViewProps, StyleSheet, TextProps } from 'react-native';
import { BorderRadius, CoreColors, Spacing } from '../../theme';

interface TypographyProps extends TextProps {
  text: string | number;
  type: string;
  color?: string;
}

const Typography = (props: TypographyProps) => {
  const {text, type, color, style} = props;
  return (
    <>
      {type ==='avatar' && <Text style={[styles.avatar, {color: color}, style]}>{text}</Text>}
      {type ==='title' && <Text style={[styles.title, {color: color}]}>{text}</Text>}
      {type ==='body' && <Text style={[styles.body, {color: color}]}>{text}</Text>}
      {type ==='number' && <Text style={[styles.numbers, {color: color}]}>{text}</Text>}
      {type ==='textButton' && <Text style={[styles.textButton, {color: color}]}>{text}</Text>}
      {type ==='text' && <Text style={[styles.text, {color: color}]}>{text}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  likeButton: {
    borderRadius: BorderRadius.full,
    width: 63,
    height: 36,
    color: CoreColors.greyDefault,
    margin: Spacing.sm,
    marginRight: Spacing.lg,
  },
  avatar: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 26,
  },
  body: {
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: 20,
  },
  numbers: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 18,
  },
  textButton: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 26,
  },
  text: {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: 26,
  }
});

export default Typography;