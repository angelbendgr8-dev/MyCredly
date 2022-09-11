import {Image} from 'react-native';
import React, {useEffect} from 'react';
import Box from './Box';
import Text from './Text';

import Icon from 'react-native-vector-icons/AntDesign';
import Clickable from './Clickable';
import {useGetBalanceQuery} from '../state/services/wallet.services';
import {useDispatch} from 'react-redux';
import {updateWallet} from '../state/reducers/wallet.reducer';

const WalletItem = ({item}) => {
  

  return (
    <Clickable
      flexDirection="row"
      backgroundColor={'secondary'}
      alignItems="center"
      paddingHorizontal="mx3"
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
            source={item.icon}
            style={{height: 20, width: 20, tintColor: 'white'}}
          />
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
      <Icon name="right" color="white" size={12} />
    </Clickable>
  );
};

export default WalletItem;
