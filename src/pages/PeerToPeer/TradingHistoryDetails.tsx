import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import Select from '../../Components/Select';
import Box from '../../Components/Box';
import {
  useAppealTradingMutation,
  useCompleteTradingMutation,
  useDisputeTradingMutation,
  useGetTradingHistoryQuery,
} from '../../state/services/transactions.services';
import _ from 'lodash';
import Clickable from '../../Components/Clickable';
import Thumb from 'react-native-vector-icons/Feather';
import {useTheme} from '@shopify/restyle';
import {currencyFormat, performAsyncCalls} from '../../helpers/constants';
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import Button from '../../Components/Button';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useAuth} from '../../state/hooks/userAuth';
import {useToast} from 'react-native-toast-notifications';

const TradingHistoryDetails = () => {
  const theme = useTheme();
  const {params} = useRoute();
  const {item} = params;
  const {muted} = theme.colors;
  const type = item.listing.type;
  const {user} = useAuth();
  const toast = useToast();
  const {goBack} = useNavigation();
  const [appealTrading, {isLoading}] = useAppealTradingMutation();
  const [disputeTrading, {isLoading: disputeLoading}] =
    useDisputeTradingMutation();
  const [completeTrading, {isLoading: completeLoading}] =
    useCompleteTradingMutation();

  console.log(item.trader_id);

  const completeTransaction = async () => {
    const response = await performAsyncCalls({id: item.id}, completeTrading);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      console.log(response);
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      goBack();
    }
  };
  const appealTransaction = async () => {
    const response = await performAsyncCalls({id: item.id}, appealTrading);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      console.log(response);
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      goBack();
    }
  };
  const disputeTransaction = async () => {
    const response = await performAsyncCalls({id: item.id}, disputeTrading);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      console.log(response);
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
    goBack();
  };

  const renderSuccessStatus = () => {
    if (item.status === 'completed') {
      return (
        <Box backgroundColor={'success1'} padding="mx4">
          <Box paddingVertical={'my2'}>
            <Text variant="medium" paddingVertical={'mx2'} fontSize={24}>
              Order Completed
            </Text>
            <Text variant={'regular'} color="muted">
              You successfully {type === 'buy' ? 'Sold' : 'Purchased'} orders
              have been completed within {item.listing.time} minutes
            </Text>
          </Box>
        </Box>
      );
    }
  };
  const renderPendingStatus = () => {
    if (item.status === 'pending' && user.id === item.trader_id) {
      return (
        <Box backgroundColor={'secondary'} padding="mx4">
          <Box>
            <Text variant="medium" padding={'mx2'} fontSize={24}>
              Initiated
            </Text>
            <Text variant={'regular'} color="muted">
              A new trader order has been created by a seller, await order
              completing from {type === 'buy' ? 'seller' : 'buyer'}
            </Text>
          </Box>
        </Box>
      );
    } else if (item.status === 'pending') {
      <Box backgroundColor={'pink'} padding="mx4">
        <Box backgroundColor={'primary'} padding="my2">
          <Text variant="medium" padding={'mx2'} fontSize={24}>
            Releasing
          </Text>
          <Text variant={'regular'} color="muted">
            this {type === 'buy' ? "seller's" : "buyer's"} orders have been
            completed within {item.listing.time} minutes
          </Text>
        </Box>
      </Box>;
    }
  };
  const renderCancelStatus = () => {
    if (item.status === 'pending' && user.id === item.trader_id) {
      return (
        <Box backgroundColor={'pink'} padding="mx4">
          <Box backgroundColor={'primary'} padding="my2">
            <Text variant="medium" padding={'mx2'} fontSize={24}>
              Releasing
            </Text>
            <Text variant={'regular'} color="muted">
              this {type === 'buy' ? "seller's" : "buyer's"} orders have been
              completed within {item.listing.time} minutes
            </Text>
          </Box>
        </Box>
      );
    }
  };
  const renderPaidStatus = () => {
    if (item.status === 'paid' && user.id == item.trader_id) {
      return (
        <Box backgroundColor={'secondary'} padding="mx4">
          <Box padding="my2">
            <Text variant="medium" paddingVertical={'mx2'} fontSize={24}>
              Releasing
            </Text>
            <Text variant={'regular'} color="muted">
              This {type === 'buy' ? "seller's" : "buyer's"} orders have been
              completed within {item.listing.time} minutes
            </Text>
          </Box>
        </Box>
      );
    } else if (item.status === 'paid') {
      return (
        <Box backgroundColor={'secondary'} padding="mx4">
          <Box padding="my2">
            <Text variant="medium" paddingVertical={'mx2'} fontSize={24}>
              Not Confirmed
            </Text>
            <Text variant={'regular'} color="muted">
              This {type === 'buy' ? "seller's" : "buyer's"} has not confirmed
              this transaction
            </Text>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Container>
      <Header leftIcon={true} text={'Trading Details'} />
      <Box marginVertical={'my1'}>
        {renderCancelStatus()}
        {renderPaidStatus()}
        {renderPendingStatus()}
        {renderSuccessStatus()}
      </Box>

      <Box backgroundColor={'secondary'} padding="mx4">
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          marginBottom={'my2'}>
          <Box flexDirection={'row'}>
            <Text
              variant={'medium'}
              color={type === 'buy' ? 'success1' : 'pink'}
              fontSize={20}
              paddingRight="mx2"
              textTransform={'capitalize'}>
              {item.listing.type}
            </Text>
            <Text variant="medium" fontSize={20}>
              {' '}
              {item.listing.asset}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box
            flexDirection={'row'}
            marginVertical={'my1'}
            justifyContent="space-between">
            <Text variant={'medium'} fontSize={16} color={'muted'}>
              Fiat Amount
            </Text>
            <Text variant={'medium'} fontSize={20}>
              {currencyFormat(item.price)}
            </Text>
          </Box>
          <Box
            flexDirection={'row'}
            marginVertical={'my1'}
            justifyContent="space-between">
            <Text variant={'medium'} fontSize={16} color={'muted'}>
              Price
            </Text>
            <Text variant={'medium'} color="muted" fontSize={14}>
              {currencyFormat(item.listing.price)}
            </Text>
          </Box>
          <Box
            flexDirection={'row'}
            marginVertical={'my1'}
            justifyContent="space-between">
            <Text variant={'medium'} fontSize={16} color={'muted'}>
              Cypto Amount
            </Text>
            <Text variant={'medium'} color="muted" fontSize={16}>
              {item.listing.amount} {item.listing.asset}
            </Text>
          </Box>
        </Box>

        <Box
          borderBottomWidth={0.5}
          marginVertical="my2"
          borderBottomColor="muted"
        />
        <Box>
          <Box
            flexDirection={'row'}
            justifyContent="space-between"
            marginVertical={'my1'}>
            <Box flexDirection={'row'}>
              <Text variant={'medium'} color="muted">
                Order Number
              </Text>
            </Box>
            <Box flexDirection={'row'}>
              <Text variant={'medium'}>{item.trans_id}</Text>
            </Box>
          </Box>

          <Box
            flexDirection={'row'}
            justifyContent="space-between"
            marginVertical={'my1'}>
            <Box flexDirection={'row'}>
              <Text variant={'medium'} color={'muted'}>
                Created Time
              </Text>
            </Box>
            <Box flexDirection={'row'}>
              <Text variant={'medium'} color="light" fontSize={14}>
                {moment(item.updated_at).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </Box>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent="space-between"
            marginVertical={'my1'}>
            <Box flexDirection={'row'}>
              <Text variant={'medium'} color={'muted'}>
                {type === 'buy' ? "Seller's Nickname" : "Buyer's Nickname"}
              </Text>
            </Box>
            <Box flexDirection={'row'}>
              <Text
                variant={'medium'}
                color="light"
                textTransform={'uppercase'}>
                {item.user.username}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={'secondary'} padding="mx4" marginVertical={'my2'}>
        <Box
          flexDirection={'row'}
          justifyContent="space-between"
          marginVertical={'my1'}>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color={'muted'}>
              Payment Method
            </Text>
          </Box>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color="light" fontSize={14}>
              {item.listing.payment_type}
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent="space-between"
          marginVertical={'my1'}>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color={'muted'}>
              Transaction Message
            </Text>
          </Box>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color="light" fontSize={14}>
              {item.trans_id}
            </Text>
          </Box>
        </Box>
      </Box>
      {item.status === 'paid' && user.id == item.trader_id ? (
        <Box
          // backgroundColor={'danger'}
          justifyContent={'space-around'}
          width={'100%'}
          flexDirection={'row'}>
          <Button
            label="Cancel"
            onPress={appealTransaction}
            //   backgroundColor={'pink'}
            flex={1}
            width={widthPercentageToDP('45%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
            style={{backgroundColor: 'rgba(247,59,113,0.2)'}}
          />
          <Button
            label="Confirm"
            onPress={completeTransaction}
            backgroundColor={'success1'}
            width={widthPercentageToDP('45%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </Box>
      ) : item.status === 'paid' && item.user_id === user.id ? (
        <Box
          // backgroundColor={'danger'}
          justifyContent={'space-around'}
          width={'100%'}
          flexDirection={'row'}>
          <Button
            label="Dispute"
            onPress={disputeTransaction}
            backgroundColor={'pink'}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </Box>
      ) : item.status === 'completed' ? (
        <Box backgroundColor={'secondary'} padding="mx4">
          <Text variant={'regular'} textAlign="center">
            How was your trading experience
          </Text>
          <Box
            flexDirection={'row'}
            justifyContent={'center'}
            marginTop={'mx3'}>
            <Clickable
              flexDirection={'row'}
              paddingVertical={'my2'}
              paddingHorizontal={'mx4'}
              marginHorizontal={'mx2'}
              borderRadius={15}
              alignItems="center"
              width={widthPercentageToDP('45%')}
              backgroundColor="faint">
              <Thumb name="thumbs-up" color={muted} size={15} />
              <Text variant={'medium'} paddingLeft="mx3">
                Positive
              </Text>
            </Clickable>
            <Clickable
              flexDirection={'row'}
              paddingVertical={'my2'}
              paddingHorizontal={'mx4'}
              marginHorizontal={'mx2'}
              alignItems="center"
              width={widthPercentageToDP('45%')}
              borderRadius={15}
              backgroundColor="faint">
              <Thumb name="thumbs-down" color={muted} size={15} />
              <Text variant={'medium'} paddingLeft="mx3">
                Positive
              </Text>
            </Clickable>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default TradingHistoryDetails;

const styles = StyleSheet.create({});
