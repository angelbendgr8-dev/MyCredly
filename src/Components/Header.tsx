import {TouchableOpacity} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from './Text';
import {RFValue} from 'react-native-responsive-fontsize';
import {useNavigation} from '@react-navigation/native';

const Box = createBox();
type Props = {
  text?: string;
  leftIcon?: boolean;
};
const Header: React.FC<Props> = ({leftIcon = false, text = ''}) => {
  const {goBack} = useNavigation();
  return (
    <Box
      backgroundColor={'secondary'}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'mx2'}
      paddingVertical={'my2'}>
      {leftIcon && (
        <TouchableOpacity onPress={goBack} style={{padding: 2}}>
          <Icon name="left" color="white" size={18} />
        </TouchableOpacity>
      )}
      <Box alignItems={'center'} flex={2}>
        <Text variant={'bold'} marginRight={'s'} fontSize={RFValue(22)}>
          {text}
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
