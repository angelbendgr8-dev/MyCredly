import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBox} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';
import ModalContainer from '../../Components/Modal';
import {useGetBanksQuery} from '../../state/services/SettingsService';
import {useDispatch} from 'react-redux';
const Box = createBox();
const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];
import _ from 'lodash';
import {setBanks} from '../../state/reducers/wallet.reducer';
import {Loader} from '../../Components/Loader';
import {useWallet} from '../../state/hooks/wallet.hooks';
import {useToast} from 'react-native-toast-notifications';
import {
  useGetWithdrawalsQuery,
  useWithdrawFundMutation,
} from '../../state/services/wallet.services';
import {useNavigation} from '@react-navigation/native';
import {performAsyncCalls} from '../../helpers/constants';
import {
  addWithdrawal,
  setWithdrawals,
} from '../../state/reducers/transactions.reducer';

const schema = yup
  .object({
    amount: yup.string().required('Amount is Required'),
    bank_id: yup.string().required('Bank is Required'),
  })
  .required();

const Withdraw = () => {
  // const theme = useTheme();
  // const {foreground} = theme.colors;
  const {data: bankData, isLoading} = useGetBanksQuery();
  const {data: withdrawals, isLoading: withdrawalHistory} =
    useGetWithdrawalsQuery();
  const [withdrawFunds, {isLoading: withdrawalLoading}] =
    useWithdrawFundMutation();
  const {banks} = useWallet();
  const {cwallet} = useContext(AppContext);
  const {goBack} = useNavigation();
  // console.log(cwallet);
  const toast = useToast();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      amount: '',
      bank_id: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (bankData) {
      // console.log(bankData);
      if (_.size(bankData.data) > 0) {
        dispatch(setBanks({banks: bankData.data}));
      } else {
        setShowModal(true);
      }
    }
  }, [bankData, setShowModal, dispatch]);

  useEffect(() => {}, [banks]);

  useEffect(() => {
    if (withdrawals) {
      // console.log(withdrawals);
      if (_.size(withdrawals.data) > 0) {
        dispatch(setWithdrawals({withdrawals: withdrawals.data}));
      }
    }
  }, [withdrawals, dispatch]);

  const confirm = () => {
    setShowModal(false);
  };
  const cancel = () => {
    setShowModal(false);
  };
  const onSubmit = async credentials => {
    credentials.wallet_id = cwallet.id;
    credentials.type = cwallet.category.name;
    const response = await performAsyncCalls(credentials, withdrawFunds);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      // const {data} = response;
      console.log(response);
      dispatch(addWithdrawal({withdrawal: data.data}));
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      goBack();
    }
  };
  return (
    <Box flex={1} backgroundColor={'background'}>
      <Loader visible={isLoading || withdrawalLoading} />
      <ModalContainer
        primaryText={'Confirm Deposit'}
        visible={showModal}
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
        <ScrollView>
          <Box>
            <Text variant={'regular'}>Fund via</Text>
            <Select data={data} disabled={false} />
          </Box>
          <Box>
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
                  value={value}
                  type={'none'}
                  customStyles={{
                    margin: 0,
                    borderRadius: 30,
                    height: heightPercentageToDP('6%'),
                    marginTop: heightPercentageToDP('2%'),
                  }}
                  placeholder={' Enter Amount'}
                  onChange={input => onChange(input)}
                />
              )}
              name="amount"
            />
            <Box flexDirection={'row'}>
              <Text variant={'regular'} color={'muted'}>
                Wallet Bal:
              </Text>
              <Text variant={'regular'} fontSize={14}>
                {' '}
                ₦ 0.00
              </Text>
            </Box>
          </Box>

          <Box marginTop={'my2'}>
            <Text variant={'regular'}>Select Bank</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <Select
                  data={banks ? banks : []}
                  onSelect={val => onChange(val)}
                  disabled={false}
                />
              )}
              name="bank_id"
            />
          </Box>

          <Box>
            {/* <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Account Number
            </Text> */}
            {/* <Input
              value={''}
              type={'none'}
              customStyles={{
                margin: 0,
                borderRadius: 30,
                height: heightPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}
              placeholder={'Enter Account Number'}
              onChange={input => console.log(input)}
            /> */}
          </Box>
          <Text variant="regular" color={'muted'}>
            Fee Charged ₦ 0.00
          </Text>
          <Box flexDirection={'row'}>
            <Text variant={'regular'}>Note: </Text>
            <Text variant={'regular'} color={'muted'}>
              Withdrawal may take up to 6 hours
            </Text>
          </Box>

          <Button
            label="Submit"
            onPress={handleSubmit(onSubmit, error => console.log(error))}
            backgroundColor={'success1'}
            width={widthPercentageToDP('85%')}
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

export default Withdraw;

const styles = StyleSheet.create({});
