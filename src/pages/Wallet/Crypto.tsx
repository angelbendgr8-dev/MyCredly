import {Image, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import Container from '../../Components/Container';
import Box from '../../Components/Box';
import {bitcoin, celo, ethereum} from '../../assets';
import Text from '../../Components/Text';
import _ from 'lodash';

import Icon from 'react-native-vector-icons/AntDesign';
import Clickable from '../../Components/Clickable';
import {useNavigation} from '@react-navigation/native';
import {useWallet} from '../../state/hooks/wallet.hooks';
import {assetUrl} from '../../helpers/constants';
import { useGetBalanceQuery } from '../../state/services/wallet.services';
import { useDispatch } from 'react-redux';
import { updateWallet } from '../../state/reducers/wallet.reducer';

const data = [
  {label: 'BTC', value: 'BTC', icon: bitcoin, code: '₦'},
  {label: 'CELO', value: 'CELO', icon: celo, code: '₵'},
  {label: 'ETH', value: 'ETH', icon: ethereum, code: '$'},
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
  // console.log(item.id);
  const {data, isloading, refetch} = useGetBalanceQuery(item.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      // console.log('balance', data);
      dispatch(updateWallet({wallet: data.data}));
    }
    setTimeout(() => {
      refetch();
    }, 500000);
  }, [data, dispatch, refetch]);
  return (
    <Clickable
      flexDirection="row"
      backgroundColor={'secondary'}
      alignItems="center"
      paddingHorizontal="mx3"
      onPress={() => navigate('CryptoWalletInfo', {item})}
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
            style={{height: 20, width: 20, borderRadius: 60}}
          />
        </Box>
        <Box marginLeft={'mx2'}>
          <Text variant={'medium'} fontSize={12} color="success1">
            {item.name} Wallet
          </Text>
          <Text variant={'regular'} fontSize={13}>
            0.00 {item.name}
          </Text>
        </Box>
      </Box>
      <Icon name="right" color="white" size={12} />
    </Clickable>
  );
};

const Crypto = () => {
  const {cryptos} = useWallet();
  console.log(cryptos);
  return (
    <Container paddingHorizontal={'mx4'}>
      {cryptos && !_.isEmpty(cryptos) ? (
        <ScrollView>
          {cryptos.map(item => (
            <WalletItem key={item.id} item={item} />
          ))}
        </ScrollView>
      ) : (
        <Box flex={1} justifyContent={'center'} alignItems="center">
          <Text variant={'medium'}>No wallet items</Text>
        </Box>
      )}
    </Container>
  );
};

export default Crypto;
