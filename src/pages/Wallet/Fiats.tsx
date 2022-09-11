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
import {useWallet} from '../../state/hooks/wallet.hooks';
import {assetUrl} from '../../helpers/constants';

const data = [
  {label: 'NGN', value: 'NGN', icon: ngn, code: '₦'},
  {label: 'GHS', value: 'GHS', icon: ghs, code: '₵'},
  {label: 'USD', value: 'USD', icon: usa, code: '$'},
];
export interface Item {
  label: string;
  value: string;
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
          <Image
            source={{uri: `${assetUrl()}${item.wType.icon}`}}
            style={{height: 20, width: 20}}
          />
        </Box>
        <Box marginLeft={'mx2'}>
          <Text variant={'medium'} fontSize={12} color="success1">
            {item.name} Wallet
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
  const {fiats} = useWallet();
  console.log(fiats);
  return (
    <Container paddingHorizontal={'mx3'}>
      {fiats && !_.isEmpty(fiats) ? (
        <ScrollView>
          {fiats.map(item => (
            <WalletItem key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <Box flex={1} justifyContent={'center'} alignItems='center'>
          <Text variant={'medium'}>No wallet items</Text>
        </Box>
      )}
    </Container>
  );
};

export default Fiats;
