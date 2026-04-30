import { PostType } from '@/app/src/hooks/usePosts';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CoreColors } from '../../../theme';

const types: { label: string; value: PostType }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Бесплатные', value: 'free' },
  { label: 'Платные', value: 'paid' },
];

export const FeedFilters = ({ active, onChange }: { active: PostType, onChange: (v: PostType) => void }) => {
  return (
    <View style={styles.container}>
      {types.map((t) => (
        <TouchableOpacity 
          key={t.value} 
          style={[styles.tab, active === t.value && styles.activeTab]} 
          onPress={() => onChange(t.value)}
        >
          <Text 
            numberOfLines={1}
            style={[styles.text, active === t.value && styles.activeText]}
          >
            {t.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row',
    margin: 8, 
    borderRadius: 22, 
    backgroundColor: CoreColors.white,
  },
  tab: { 
    flex: 1,
    height: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 22, 
    backgroundColor: CoreColors.white,
  },
  activeTab: { 
    backgroundColor: CoreColors.purpleDefault,
  },
  text: { 
    fontSize: 14,
    fontWeight: '600', 
    color: '#333' 
  },
  activeText: { 
    color: '#fff' 
  }
});