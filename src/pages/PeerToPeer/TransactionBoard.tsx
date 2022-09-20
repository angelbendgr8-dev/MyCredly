import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import moment from 'moment';
import Box from '../../Components/Box';
import {useClipboard} from '@react-native-clipboard/clipboard';
import Copy from 'react-native-vector-icons/Feather';
import Clickable from '../../Components/Clickable';
import {useTheme} from '@shopify/restyle';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {currencyFormat, performAsyncCalls} from '../../helpers/constants';
import {useCountdown, useTimeout} from 'usehooks-ts';
import Button from '../../Components/Button';
import {
  useCancelTradingMutation,
  useConfirmTradingPaymentMutation,
} from '../../state/services/transactions.services';
import {useToast} from 'react-native-toast-notifications';
import {updateTrading} from '../../state/reducers/transactions.reducer';
import {useDispatch} from 'react-redux';
const TransactionBoard = () => {
  const {params} = useRoute();
  const {item, trading} = params;
  const [id, setId] = useClipboard();
  const [name, setName] = useClipboard();
  const [bankName, setBankName] = useClipboard();
  const [accNum, setAccNum] = useClipboard();
  const theme = useTheme();
  const {faint, muted, pink} = theme.colors;

  const [cancelled, setCancelled] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cancelTrading, {isLoading}] = useCancelTradingMutation();
  const [confirmTradingPayment, {isLoading: paymentLoading}] =
    useConfirmTradingPaymentMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const timer = item.time * 60;

  const [intervalValue, setIntervalValue] = useState(1000);

  const [count, {startCountdown}] = useCountdown({
    countStart: timer,

    intervalMs: intervalValue,
  });

  const cancelTransaction = async () => {
    console.log('here', 1);
    const response = await performAsyncCalls({id: trading.id}, cancelTrading);
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
      setCancelled(true);
      dispatch(updateTrading({trading: response.data}));
    }
  };

  useTimeout(cancelTransaction, timer * 1000);
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes ? `${minutes}:${minutes > 1 ? '' : ''}` : ''}${
      seconds ? `${seconds}${seconds > 1 ? '' : ''}` : ''
    }`;
  };
  const confirmTransaction = async () => {
    const response = await performAsyncCalls(
      {id: trading.id},
      confirmTradingPayment,
    );
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
      setConfirmed(true);
      dispatch(updateTrading({trading: response.data}));
    }
  };
  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <Container>
      <Header leftIcon={true} text={''} />
      <Text
        variant={'medium'}
        marginHorizontal={'my3'}
        marginVertical={'mx3'}
        fontSize={18}
        textTransform={'capitalize'}>
        {item.type}{' '}
        <Text variant={'bold'} fontSize={20} textTransform={'uppercase'}>
          {item.asset}
        </Text>
      </Text>
      <ScrollView>
        <Box
          marginVertical={'mx3'}
          paddingVertical={'my3'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <Box>
            <Text
              variant={'medium'}
              marginHorizontal={'my3'}
              fontSize={12}
              color={'muted'}
              textTransform={'capitalize'}>
              Date:{' '}
              <Text
                variant={'regular'}
                fontSize={13}
                textTransform={'uppercase'}>
                {moment(trading.created_at).format('DD-mm-yyyy')}
              </Text>
            </Text>
            <Text
              variant={'medium'}
              marginHorizontal={'my3'}
              fontSize={12}
              color={'muted'}
              textTransform={'capitalize'}>
              Time:{' '}
              <Text
                variant={'regular'}
                fontSize={13}
                textTransform={'uppercase'}>
                {moment(trading.created_at).format('h:mm a')}
              </Text>
            </Text>
            <Box flexDirection={'row'}>
              <Text
                variant={'medium'}
                marginHorizontal={'my3'}
                fontSize={12}
                color={'muted'}>
                ID:{' '}
                <Text variant={'regular'} fontSize={13}>
                  {trading.trans_id}
                </Text>
              </Text>
              <Clickable onPress={() => setId(trading.trans_id)}>
                <Copy name="copy" color={muted} size={18} />
              </Clickable>
            </Box>

            <Box
              borderBottomWidth={0.5}
              marginVertical={'my3'}
              marginHorizontal={'mx4'}
              borderBottomColor={'faint'}
            />
          </Box>

          <Box>
            <Text
              variant={'medium'}
              marginHorizontal={'my3'}
              marginVertical={'mx3'}
              fontSize={12}
              color={'muted'}
              textTransform={'capitalize'}>
              Amount:
            </Text>
            <Text
              marginHorizontal={'my3'}
              marginVertical={'mx1'}
              variant={'regular'}
              fontSize={18}
              textTransform={'uppercase'}>
              {currencyFormat(trading.price, '₦', 2)}
            </Text>
            <Text
              variant={'medium'}
              marginHorizontal={'my3'}
              marginVertical={'mx1'}
              fontSize={12}
              color={'muted'}
              textTransform={'capitalize'}>
              Quantity:
              <Text
                variant={'regular'}
                fontSize={12}
                textTransform={'uppercase'}>
                {trading.amount} {item.asset}
              </Text>
            </Text>
            <Text
              variant={'medium'}
              marginHorizontal={'my3'}
              marginVertical={'mx1'}
              fontSize={12}
              color={'muted'}
              textTransform={'capitalize'}>
              Transaction Fee:
              <Text
                variant={'regular'}
                fontSize={12}
                textTransform={'uppercase'}>
                {0.0} {item.asset}
              </Text>
            </Text>

            <Box
              backgroundColor={'info'}
              paddingHorizontal={'my3'}
              borderRadius={10}
              marginTop={'my3'}
              paddingVertical={'my2'}>
              <Text variant={'regular'} fontSize={13}>
                Bank Details
              </Text>
              <Box
                flexDirection={'row'}
                marginVertical={'mx1'}
                justifyContent={'space-between'}>
                <Text variant={'medium'} fontSize={12} color={'light'}>
                  Name:{' '}
                </Text>
                <Text variant={'regular'} fontSize={13}>
                  {trading.account_name}
                </Text>
                <Clickable onPress={() => setName(trading.account_name)}>
                  <Copy name="copy" color={muted} size={18} />
                </Clickable>
              </Box>
              <Box
                flexDirection={'row'}
                marginVertical={'mx1'}
                justifyContent={'space-between'}>
                <Text variant={'medium'} fontSize={12} color={'light'}>
                  Bank:{' '}
                </Text>
                <Text variant={'regular'} fontSize={13}>
                  {trading.bank_name}
                </Text>
                <Clickable onPress={() => setBankName(trading.bank_name)}>
                  <Copy name="copy" color={muted} size={18} />
                </Clickable>
              </Box>
              <Box
                flexDirection={'row'}
                marginVertical={'mx1'}
                justifyContent={'space-between'}>
                <Text variant={'medium'} fontSize={12} color={'light'}>
                  Bank:{' '}
                </Text>
                <Text variant={'regular'} fontSize={13}>
                  {trading.account_number}
                </Text>
                <Clickable onPress={() => setAccNum(trading.account_number)}>
                  <Copy name="copy" color={muted} size={18} />
                </Clickable>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Text
            variant={'medium'}
            marginHorizontal={'my3'}
            marginVertical={'mx3'}
            fontSize={13}
            textTransform={'capitalize'}>
            Time limit:{' '}
            <Text variant={'regular'} fontSize={14} textTransform={'uppercase'}>
              {formatTime(count)}
            </Text>
          </Text>
          <Text
            variant={'medium'}
            marginHorizontal={'my3'}
            marginVertical={'mx2'}
            fontSize={12}
            color={'muted'}
            textTransform={'capitalize'}>
            please ensure payment is made within 15 minutes, else transaction
            would be cancelled;
          </Text>

          <Box
            // backgroundColor={'danger'}
            justifyContent={'space-around'}
            width={'100%'}
            flexDirection={'row'}>
            <Button
              label="Cancel"
              onPress={cancelTransaction}
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
              onPress={confirmTransaction}
              backgroundColor={'success1'}
              width={widthPercentageToDP('45%')}
              labelStyle={{color: 'white'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
            />
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default TransactionBoard;
