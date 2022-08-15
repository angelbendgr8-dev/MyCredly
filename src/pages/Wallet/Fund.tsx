import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '../../Components/Container';
import {createBox, useTheme} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalContainer from '../../Components/Modal';
import {useRoute} from '@react-navigation/native';
import {useWallet} from '../../state/hooks/wallet.hooks';
import {useFundWalletMutation} from '../../state/services/wallet.services';
const Box = createBox();
const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];

const schema = yup
  .object({
    email: yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),

    password: yup.string().required('Password is required'),
  })
  .required();

const Fund = () => {
  const theme = useTheme();
  const {setShowModal} = useContext(AppContext);
  const {cwallet} = useContext(AppContext);
  // const {type} = params;
  const [wallet, setWallet] = useState({});
  const {wallets} = useWallet();
  const [formSubmited, setFormSubmited] = useState(false);
  const [fundWallet, {isLoading}] = useFundWalletMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      amount: 0,
      wallet_id: wallet.id,
    },
    resolver: yupResolver(schema),
  });

  const confirm = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const temp = wallets.filter(item => item.name === cwallet);
    console.log(temp);
    setWallet(temp[0]);
  }, [wallets, cwallet]);
  useEffect(() => {
    console.log(wallet);
  }, [wallet]);

  const createTransaction = () => {};
  const cancel = () => {
    setShowModal(false);
  };
  return (
    <Box flex={1} backgroundColor={'background'}>
      <ModalContainer
        primaryText={'Confirm Deposit'}
        onCancelled={cancel}
        onConfirmed={confirm}
        secondaryText={
          '3rd party payments will not be approved and will be refunded'
        }
      />
      <ModalContainer
        primaryText={'Confirm Payment'}
        onCancelled={cancel}
        onConfirmed={confirm}
        secondaryText={
          '3rd party payments will not be approved and will be refunded'
        }
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
          <Box></Box>
          <Button
            label="Submit"
            onPress={() => setShowModal(true)}
            backgroundColor={'success1'}
            width={'100%'}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Fund;

const styles = StyleSheet.create({});
