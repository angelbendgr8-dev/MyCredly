import {ScrollView, Image} from 'react-native';
import {ghs, ngn, usa} from '../../assets';

import React from 'react';
import Container from '../../Components/Container';
import Box from '../../Components/Box';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {useNavigation} from '@react-navigation/native';

const data = [
  {label: 'NGN', value: 'NGN', icon: ngn, code: '₦'},
  {label: 'GHS', value: 'GHS', icon: ghs, code: '₵'},
  {label: 'USD', value: 'USD', icon: usa, code: '$'},
];
export interface Item {
  label: String;
  value: String;
  code: string;
  icon?: object;
}
type Props = {
  item: Item;
};

const WalletItem: React.FC<Props> = ({item}) => {
  const {navigate} = useNavigation();
  return (
    <Clickable
      flexDirection="row"
      backgroundColor={'secondary'}
      alignItems="center"
      paddingHorizontal="mx3"
      onPress={() => navigate('WalletInfo', {item})}
      paddingVertical={'my3'}
      borderRadius={10}
      elevation={15}
      marginBottom="my3"
      justifyContent="space-between">
      <Box flexDirection={'row'} alignItems="center">
        <Box
          backgroundColor={'background'}
          height={40}
          width={40}
          alignItems="center"
          justifyContent={'center'}
          borderRadius={150}>
          <Image source={item.icon} style={{height: 15, width: 20}} />
        </Box>
        <Box marginLeft={'mx2'}>
          <Text variant={'medium'} fontSize={12} color="success1">
            {item.label} Wallet
          </Text>
          <Text variant={'regular'} fontSize={13}>
            {item.code} 0.00
          </Text>
        </Box>
      </Box>
      <Icon name="right" color="white" size={14} />
    </Clickable>
  );
};

const Fiats = () => {
  return (
    <Container paddingHorizontal={'mx3'}>
      {_.isEmpty(data) ? (
        <Box>No wallet items</Box>
      ) : (
        <ScrollView>
          {data.map(item => (
            <WalletItem key={item.label} item={item} />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};

export default Fiats;
