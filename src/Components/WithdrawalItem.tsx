import {StyleSheet} from 'react-native';
import React from 'react';
import {createBox} from '@shopify/restyle';
import Text from './Text';
import moment from 'moment';

const Box = createBox();
type Props = {
  withdrawal?: {} | null;
  wallet?: {};
};
const WithdrawalItem = ({withdrawal = {}, wallet}: Props) => {
  // console.log(wallet);
  return (
    <Box
      backgroundColor={'secondary'}
      flexDirection={'row'}
      alignItems={'center'}
      paddingVertical={'my1'}
      paddingHorizontal="mx2"
      marginHorizontal="mx3"
      marginBottom={'my1'}
      elevation={5}
      borderRadius={10}
      justifyContent={'space-between'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Box
          backgroundColor={'success1'}
          borderRadius={120}
          marginRight="s"
          height={50}
          width={50}
          justifyContent={'center'}
          style={{padding: 10}}
          alignItems={'center'}>
          <Text variant={'medium'}>{wallet?.wType.sign} </Text>
        </Box>
        <Box flexDirection={'column'}>
          <Text variant={'medium'} fontSize={12} color={'light'}>
            {wallet?.name} Withdrawal
          </Text>
          <Text variant={'regular'} fontSize={12} color={'muted'}>
            {moment().format('D, MMM Y')}
          </Text>
          <Text variant={'regular'} fontSize={12} color={'muted'}>
            {moment().format('HH:MM A')}
          </Text>
        </Box>
      </Box>
      <Text variant={'regular'}>
        {wallet?.wType.sign} {withdrawal?.amount}
      </Text>
    </Box>
  );
};

export default WithdrawalItem;

const styles = StyleSheet.create({});
