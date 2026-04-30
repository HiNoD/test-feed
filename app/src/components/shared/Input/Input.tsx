import React, { useEffect, useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CoreColors } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommentInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isKeyboardVisible]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <View style={[styles.container, { marginBottom: isKeyboardVisible ? 8 : 0 }]}>
      <TextInput
        style={styles.input}
        placeholder="Ваш комментарий"
        value={text}
        onChangeText={setText}
        multiline
        maxLength={500}
      />
      <TouchableOpacity 
        onPress={handleSend} 
        disabled={!text.trim()}
        style={styles.sendButton}
      >
        <Ionicons name="send" size={24} color={!text.trim() ? CoreColors.purpleDisable : CoreColors.purpleDefault} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
    maxHeight: 120,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});