import { View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export const Skeleton = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.7, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <View style={styles.titleLine} />
      <View style={styles.contentLine} />
      <View style={[styles.contentLine, { width: '60%' }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#E1E9EE',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  titleLine: {
    height: 20,
    backgroundColor: '#CFD8DC',
    borderRadius: 4,
    marginBottom: 10,
    width: '40%',
  },
  contentLine: {
    height: 14,
    backgroundColor: '#CFD8DC',
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
  },
});