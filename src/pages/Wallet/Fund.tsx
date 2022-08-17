import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../Components/Container';
import {createBox, useTheme} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';
import _, {isEmpty} from 'lodash';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalContainer from '../../Components/Modal';
import {useWallet} from '../../state/hooks/wallet.hooks';
import {
  useFundWalletMutation,
  useUploadRecieptMutation,
} from '../../state/services/wallet.services';
import {performAsyncCalls} from '../../helpers/constants';
import {useToast} from 'react-native-toast-notifications';
import Clickable from '../../Components/Clickable';
import {useClipboard} from '@react-native-clipboard/clipboard';

import Icon from 'react-native-vector-icons/Feather';
import UploadReceipt from './uploadReciept';
import {Loader} from '../../Components/Loader';
import {useNavigation} from '@react-navigation/native';
const Box = createBox();
const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];

const schema = yup
  .object({
    amount: yup.number().min(2000, 'minimum deposit is 2000'),
  })
  .required();

const Fund = () => {
  const theme = useTheme();
  const {muted} = theme.colors;
  const {setShowModal} = useContext(AppContext);
  const {cwallet} = useContext(AppContext);
  // const {type} = params;
  const [wallet, setWallet] = useState({});
  const {wallets} = useWallet();
  const [receiptUpload, setReceipttUpload] = useState(false);
  const [fundWallet, {isLoading: fundWalletLoading}] = useFundWalletMutation();
  const [uploadReciept, {isLoading: uploadingReceipt}] =
    useUploadRecieptMutation();
  const [showPayment, setShowPayment] = useState(false);
  const [confirmDeposit, setConfirmDeposit] = useState(false);
  const [formData, setFormData] = useState({});
  const {preceipt, setPreceipt} = useContext(AppContext);
  const [paymentDetails, setPaymentDetails] = useState({});
  const toast = useToast();

  const [{data: clipData}, setText] = useClipboard();
  const {navigate} = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      amount: 0,
      wallet_id: wallet?.id,
    },
    resolver: yupResolver(schema),
  });

  const confirm = async () => {
    setConfirmDeposit(false);
    // console.log(formData);
    const response = await performAsyncCalls(formData, fundWallet);
    // console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      // const {data} = response;
      setShowPayment(true);
      setReceipttUpload(true);
      setPaymentDetails(response.data);
      console.log(response);
    }
  };

  const copyToClipboard = () => {
    setText(`${item.wType.name}: ${item.address}`);
    toast.show('address Copied', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      animationType: 'zoom-in',
    });
  };

  useEffect(() => {
    // console.log(cwallet);
    if (cwallet) {
      const temp = wallets.filter(item => item.id === cwallet.id);
      // console.log(temp);
      setWallet(temp[0]);
    }
  }, [wallets, cwallet]);
  useEffect(() => {
    console.log(paymentDetails);
  }, [wallet, paymentDetails]);

  const onSubmit = credentials => {
    credentials.wallet_id = wallet.id;
    setFormData(credentials);
    setConfirmDeposit(true);
  };
  const cancel = () => {
    setConfirmDeposit(false);
    // handleSubmit(createTransaction);
  };
  const uploadPaymentReceipt = async () => {
    console.log(preceipt);
    let receiptData = new FormData();

    receiptData.append('image', preceipt);
    receiptData.append('wallet_id', paymentDetails.transaction.id);
    // console.log(receiptData);
    const response = await uploadReciept(receiptData);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      // const {data} = response;
      toast.show('Receipt Uploaded Successfully', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      // setPaymentDetails(response.data);
      navigate('Dashboard');
    }
  };
  return (
    <Box flex={1} backgroundColor={'background'}>
      <Loader visible={fundWalletLoading || uploadingReceipt} />
      <ModalContainer
        primaryText={'Confirm Deposit'}
        onCancelled={cancel}
        onConfirmed={confirm}
        visible={confirmDeposit}
        secondaryText={
          '3rd party payments will not be approved and will be refunded'
        }
      />
      <ModalContainer
        primaryText={'Confirm Payment'}
        onCancelled={cancel}
        onConfirmed={() => setShowPayment(false)}
        visible={showPayment}
        secondaryText={'your account will be update one payment is confirmed'}
      />
      <Box
        marginHorizontal={'mx3'}
        paddingVertical={'my3'}
        paddingHorizontal={'mx3'}
        borderRadius={15}
        backgroundColor={'secondary'}>
        {/* <Text variant={'regular'}>{wallet?.name}</Text> */}
        <ScrollView>
          <Box>
            <Text variant={'regular'}>Fund via</Text>
            <Select data={data} />
          </Box>
          <Box textAlign={'left'}>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Amount
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <Input
                  leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
                  label={'Amount'}
                  value={value}
                  type={'none'}
                  disabled={!receiptUpload}
                  customStyles={{
                    margin: 0,
                    borderRadius: 30,
                    height: heightPercentageToDP('6%'),
                    marginVertical: heightPercentageToDP('2%'),
                  }}
                  placeholder={' Enter Amount'}
                  onChange={input => onChange(input)}
                />
              )}
              name="amount"
            />
            {errors.amount && (
              <Box width={'100%'}>
                <Text
                  variant={'regular'}
                  alignSelf="flex-end"
                  textAlign="right"
                  color="danger">
                  {errors.amount?.message}
                </Text>
              </Box>
            )}

            <Box flexDirection={'row'}>
              <Text variant={'regular'} color={'muted'}>
                Transaction Fee
              </Text>
              <Text variant={'regular'} fontSize={14}>
                {' '}
                ₦ 200
              </Text>
            </Box>
          </Box>
          <Box />
          {!receiptUpload && (
            <Button
              label="Submit"
              onPress={handleSubmit(onSubmit)}
              backgroundColor={'success1'}
              width={'100%'}
              labelStyle={{color: 'white'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
            />
          )}
          {receiptUpload && !_.isEmpty(paymentDetails) && (
            <>
              <Box
                // borderBottomWidth={1}
                backgroundColor="background"
                borderBottomColor={'muted'}
                borderRadius={10}
                elevation={0.5}>
                <Box paddingVertical={'mx4'} paddingHorizontal="mx4">
                  <Text variant={'medium'}>
                    {paymentDetails ? paymentDetails?.bank.bank_name : ''}
                  </Text>
                </Box>
                <Box borderBottomWidth={0.3} borderBottomColor={'muted'} />
                <Box
                  flexDirection={'row'}
                  justifyContent={'center'}
                  borderBottomWidth={0.3}
                  borderBottomColor={'muted'}
                  flexWrap="wrap">
                  <Box
                    flexDirection={'row'}
                    padding={'mx1'}
                    alignItems="center"
                    borderRightColor={'muted'}
                    borderRightWidth={0.5}
                    paddingRight="mx2"
                    marginVertical={'my2'}>
                    <Box width={widthPercentageToDP('25%')}>
                      <Text variant={'regular'} fontSize={14} color={'muted'}>
                        Account Name
                      </Text>
                      <Text variant={'regular'}>
                        {paymentDetails
                          ? paymentDetails?.bank.account_name
                          : ''}
                      </Text>
                    </Box>
                    <Clickable
                      onPress={() => copyToClipboard()}
                      backgroundColor={'secondary'}
                      borderRadius={5}
                      padding="s">
                      <Icon name="copy" size={14} color={muted} />
                    </Clickable>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    padding={'mx1'}
                    alignItems="center"
                    marginLeft="mx2"
                    marginVertical={'my2'}>
                    <Box width={widthPercentageToDP('25%')}>
                      <Text variant={'regular'} fontSize={14} color={'muted'}>
                        Account Number
                      </Text>
                      <Text variant={'regular'}>
                        {paymentDetails
                          ? paymentDetails?.bank.account_number
                          : ''}
                      </Text>
                    </Box>
                    <Clickable
                      onPress={() => copyToClipboard()}
                      backgroundColor={'secondary'}
                      borderRadius={5}
                      padding="s">
                      <Icon name="copy" size={14} color={muted} />
                    </Clickable>
                  </Box>
                </Box>
                <Box
                  flexDirection={'row'}
                  justifyContent={'center'}
                  flexWrap="wrap">
                  <Box
                    flexDirection={'row'}
                    padding={'mx1'}
                    alignItems="center"
                    borderRightColor={'muted'}
                    borderRightWidth={0.5}
                    paddingRight="mx2"
                    marginVertical={'my2'}>
                    <Box width={widthPercentageToDP('25%')}>
                      <Text variant={'regular'} fontSize={14} color={'muted'}>
                        Transaction Reference
                      </Text>
                      <Text variant={'regular'}>
                        {paymentDetails.transaction.trx_ref}
                      </Text>
                    </Box>
                    <Clickable
                      onPress={() => copyToClipboard()}
                      backgroundColor={'secondary'}
                      borderRadius={5}
                      padding="s">
                      <Icon name="copy" size={14} color={muted} />
                    </Clickable>
                  </Box>
                  <Box
                    flexDirection={'row'}
                    padding={'mx1'}
                    alignItems="center"
                    marginLeft="mx2"
                    marginVertical={'my2'}>
                    <Box width={widthPercentageToDP('25%')}>
                      {/* <Text variant={'regular'} fontSize={14} color={'muted'}>
                        Account Name
                      </Text>
                      <Text variant={'regular'}>olanrewaju benjamin</Text> */}
                    </Box>
                    <Clickable
                      onPress={() => copyToClipboard()}
                      // backgroundColor={'secondary'}
                      borderRadius={5}
                      padding="s">
                      <Text variant={'regular'} />
                    </Clickable>
                  </Box>
                </Box>
              </Box>
              <UploadReceipt />

              <Box flexDirection={'row'} justifyContent="space-evenly">
                <Button
                  label="upload receipt"
                  onPress={uploadPaymentReceipt}
                  backgroundColor={'success1'}
                  width={widthPercentageToDP('40%')}
                  labelStyle={{color: 'white', fontSize: 16, zIndex: 10}}
                  paddingVertical={'my2'}
                  borderWidth={0.5}
                  borderColor="success"
                  marginVertical={'my3'}
                  opacity={0.8}
                  marginRight="s"
                  elevation={5}
                  borderRadius={10}
                  alignItems={'center'}
                />
                <Button
                  label="cancel payment"
                  onPress={() => navigate('WithdrawFund')}
                  backgroundColor={'transparent'}
                  width={widthPercentageToDP('40%')}
                  // opacity={1}
                  borderWidth={0.5}
                  borderColor="foreground"
                  labelStyle={{color: 'white', fontSize: 16}}
                  paddingVertical={'my2'}
                  marginVertical={'my3'}
                  marginLeft="s"
                  borderRadius={10}
                  opacity={0.8}
                  elevation={5}
                  alignItems={'center'}
                />
              </Box>
              <Box flexDirection={'row'} justifyContent={'center'}>
                <Text variant={'medium'}>Note: </Text>
                <Text variant={'regular'} fontSize={12}>
                  Payment must include the tranaction reference in this form.Not
                  doing so may caouse delay in processing
                </Text>
              </Box>
            </>
          )}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Fund;

const styles = StyleSheet.create({});
