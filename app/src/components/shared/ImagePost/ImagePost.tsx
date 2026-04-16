import React, { useState } from 'react';
import { Image, View } from 'react-native';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { BorderRadius, CoreColors } from '../../theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ImagePostProps {
  tier: string,
  uri: string,
  onPress?: () => void,
}

const ImagePost = (props: ImagePostProps) => {
  const { tier, uri, onPress } = props;
  const [ isOpen, setIsOpen ] = useState<boolean>(tier === 'paid' ? false : true);
  return (
    <View style={{position: 'relative'}}>
      <Image source={{ uri: uri }} style={{ width: '100%', height: 393}}  blurRadius={isOpen ? 0 : 20}/>
      {!isOpen && <View style={{position: 'absolute', top: '50%', left: '50%', marginTop: '-19%', marginLeft: '-28%'}}>
        <View style={{ width: 42, height: 42, backgroundColor: CoreColors.purpleDefault, borderRadius: BorderRadius.custom, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
          <View style={{width: 20, height: 20, backgroundColor: CoreColors.white, borderRadius: BorderRadius.full, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="dollar" color={CoreColors.purpleDefault} size={16}/>
          </View>
        </View>
        <Typography text={'Контент скрыт пользователем.'} type={'text'} color={CoreColors.white}/>
        <Typography text={'Доступ откроется после доната'} type={'text'} color={CoreColors.white}/>
        <Button text={'Отправить донат'} onPress={() => setIsOpen(true)}/>
      </View>}
    </View>
  );
}

export default ImagePost;