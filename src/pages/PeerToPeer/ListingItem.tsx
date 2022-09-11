import {} from 'react-native';
import React from 'react';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {useNavigation} from '@react-navigation/native';

const ListingItem = ({item}) => {
  const {navigate} = useNavigation();
  return (
    <Box
      backgroundColor={'secondary'}
      flexDirection="row"
      justifyContent={'space-between'}
      marginVertical="my2"
      padding={'mx3'}>
      <Box>
        <Box>
          <Text variant={'regular'} color="primary" fontSize={19}>
            {item.user.username}
          </Text>
          <Text variant={'regular'} color="muted" fontSize={12}>
            price
          </Text>
          <Box flexDirection={'row'} alignItems={'flex-end'}>
            <Text variant={'regular'} color="foreground" fontSize={16}>
              {item.price}
            </Text>
            <Text
              variant={'regular'}
              marginLeft="mx1"
              paddingBottom={'s'}
              color="muted"
              fontSize={10}>
              NGN
            </Text>
          </Box>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Text variant={'regular'} color="muted" fontSize={12}>
              range
            </Text>
            <Box flexDirection={'row'} alignItems={'flex-end'}>
              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="info"
                fontSize={12}>
                {item.min_value} {' - '}
              </Text>
              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="info"
                fontSize={12}>
                {item.max_value}
              </Text>
              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="info"
                fontSize={12}>
                {item.asset}
              </Text>
            </Box>
          </Box>
          <Box flexDirection={'row'} alignItems={'center'}>
            <Text variant={'regular'} color="muted" fontSize={12}>
              Available
            </Text>
            <Box flexDirection={'row'} alignItems={'flex-end'}>
              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="info"
                fontSize={12}>
                {item.amount}
              </Text>

              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="info"
                fontSize={12}>
                {item.asset}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box backgroundColor="light" borderRadius={5} paddingHorizontal="mx1">
          <Text
            variant={'regular'}
            textTransform="capitalize"
            color={'success1'}
            fontSize={14}>
            {item.payment_type}
          </Text>
        </Box>
        <Clickable
          backgroundColor={item.type === 'buy' ? 'success1' : 'pink'}
          onPress={() => navigate('PeerTransaction', {item})}
          paddingVertical={'my2'}
          borderRadius={15}
          marginVertical="my3"
          paddingHorizontal="my3">
          <Text
            variant={'regular'}
            textTransform="capitalize"
            textAlign={'center'}
            color={'foreground'}
            fontSize={14}>
            {item.type}
          </Text>
        </Clickable>
      </Box>
    </Box>
  );
};

export default ListingItem;
