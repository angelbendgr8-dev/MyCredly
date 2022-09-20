import {useNavigation, useRoute} from '@react-navigation/native';
import React, { useEffect,useState} from 'react';
import Box from '../../Components/Box';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Text from '../../Components/Text';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDebounce} from 'usehooks-ts';
import * as yup from 'yup';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import {useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';
import {Platform, ScrollView, StyleSheet} from 'react-native';

import Modal from 'react-native-modal';
import {Dropdown} from 'react-native-element-dropdown';
import {currencyFormat, performAsyncCalls} from '../../helpers/constants';
import {useCreateTradingMutation} from '../../state/services/transactions.services';
import {useToast} from 'react-native-toast-notifications';
import {addTrading} from '../../state/reducers/transactions.reducer';
import {useDispatch} from 'react-redux';
import {Loader} from '../../Components/Loader';
import {fromPairs} from 'lodash';
import ModalContainer from '../../Components/Modal';
const ModalItem = ({title, value}) => {
  return (
    <Box
      flexDirection={'row'}
      paddingVertical="my2"
      marginHorizontal={'mx4'}
      borderBottomWidth={0.5}
      borderBottomColor={'faint'}
      justifyContent="space-evenly">
      <Box flex={1} marginLeft={'mx4'}>
        <Text
          textAlign={'left'}
          textTransform={'capitalize'}
          variant={'regular'}
          color="muted">
          {title}
        </Text>
      </Box>
      <Box flex={1} marginLeft={'mx4'}>
        <Text variant={'regular'}>{value}</Text>
      </Box>
    </Box>
  );
};

type ModalProps = {
  visible: boolean;
  action?: () => void;
  data?: {};
  close: (data?: any) => void;
};

export const BottomModal: React.FC<ModalProps> = ({
  visible,
  data,
  action,
  close,
}) => {
  return (
    <Box flex={1} justifyContent={'flex-end'}>
      <Modal
        style={{justifyContent: 'flex-end', margin: 0}}
        onBackdropPress={close}
        isVisible={visible}>
        <Box
          backgroundColor={'secondary'}
          borderTopLeftRadius={15}
          borderTopRightRadius={15}>
          <Text
            textAlign={'center'}
            paddingVertical="my3"
            variant={'medium'}
            fontSize={20}>
            Summary
          </Text>
          <Box
            borderBottomWidth={0.5}
            marginHorizontal={'mx4'}
            borderBottomColor={'faint'}
          />
          <ModalItem title={'buying'} value={data.type} />
          <ModalItem title={'From'} value={data.from} />
          <ModalItem
            title={'Buying Quantity'}
            value={`${data.amount} ${data.type}`}
          />
          <ModalItem
            title={'Amount to pay'}
            value={currencyFormat(data.price, '₦', 2)}
          />
          <ModalItem title={'Transaction fee'} value={`0.00 ${data.type}`} />
          <Box alignItems={'center'}>
            <Button
              label="Proceed"
              onPress={action}
              backgroundColor={'success1'}
              width={widthPercentageToDP('85%')}
              labelStyle={{fontWeight: '400'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              borderWidth={0.5}
              borderColor={'success1'}
              alignItems={'center'}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export const BankModal: React.FC<ModalProps> = ({visible, close}) => {
  const schema = yup
    .object({
      account_name: yup.string().required('Account Name is Required'),
      account_number: yup.string().required('Account Number is Required'),
      bank_name: yup.string().required('Bank Name is Required'),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      account_name: '',
      account_number: '',
      bank_name: '',
    },
    resolver: yupResolver(schema),
  });
  const onFinish = (credentials: any) => {
    console.log(credentials);
    close(credentials);
  };
  return (
    <Box flex={1} justifyContent={'flex-end'}>
      <Modal onBackdropPress={close} isVisible={visible}>
        <Box backgroundColor={'secondary'} borderRadius={15}>
          <Text
            textAlign={'center'}
            paddingVertical="my3"
            variant={'medium'}
            fontSize={20}>
            Enter Bank Details
          </Text>
          <Box
            borderBottomWidth={0.5}
            marginHorizontal={'mx4'}
            borderBottomColor={'faint'}
          />
          <Box paddingHorizontal={'mx3'}>
            <Box>
              <Text
                variant={'regular'}
                color={'foreground'}
                //   style={{color: foreground}}
                textAlign={'left'}>
                Bank Name
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Input
                    // leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
                    value={value}
                    type={'none'}
                    customStyles={{
                      margin: 0,
                      borderRadius: 30,
                      height: heightPercentageToDP('6%'),
                      marginVertical: heightPercentageToDP('2%'),
                    }}
                    placeholder={'Bank Name'}
                    onChange={input => onChange(input)}
                  />
                )}
                name="bank_name"
              />
            </Box>
            <Box>
              <Text
                variant={'regular'}
                color={'foreground'}
                //   style={{color: foreground}}
                textAlign={'left'}>
                Account Name
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Input
                    // leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
                    value={value}
                    type={'none'}
                    customStyles={{
                      margin: 0,
                      borderRadius: 30,
                      height: heightPercentageToDP('6%'),
                      marginVertical: heightPercentageToDP('2%'),
                    }}
                    placeholder={' Enter Account Name'}
                    onChange={input => onChange(input)}
                  />
                )}
                name="account_name"
              />
            </Box>
            <Box>
              <Text
                variant={'regular'}
                color={'foreground'}
                //   style={{color: foreground}}
                textAlign={'left'}>
                Account Number
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Input
                    // leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
                    value={value}
                    type={'none'}
                    customStyles={{
                      margin: 0,
                      borderRadius: 30,
                      height: heightPercentageToDP('6%'),
                      marginVertical: heightPercentageToDP('2%'),
                    }}
                    placeholder={' Enter Account Number'}
                    onChange={input => onChange(input)}
                  />
                )}
                name="account_number"
              />
            </Box>
            <Button
              label="Proceed"
              onPress={handleSubmit(onFinish)}
              backgroundColor={'success1'}
              width={widthPercentageToDP('85%')}
              labelStyle={{fontWeight: '400'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              borderWidth={0.5}
              borderColor={'success1'}
              alignItems={'center'}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const PeerTransaction = () => {
  const {params} = useRoute();
  const {item} = params;

  const [price, setPrice] = useState('0');
  const [minLimitError, setMinLimitError] = useState(false);
  const [limitErrorText, setLimitErrorText] = useState('');
  const [formData, setFormData] = useState({});
  const [createTrading, {isLoading}] = useCreateTradingMutation();
  const toast = useToast();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const [bank, setBank] = useState({});
  const [showBank, setShowBank] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const paymentType = [{label: item.payment_type, value: item.payment_type}];
  const [showSummary, setShowSummary] = useState(false);
  const theme = useTheme();
  const {success1, muted, background, faint} = theme.colors;
  const schema = yup
    .object({
      amount: yup
        .string()
        .min(item.min_value, `Min value is ${item.min_value}`)
        .required('Asset type is required'),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      amount: '',
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {}, [showBank, bank]);

  const onSubmit = (credentials: any) => {
    console.log(credentials);
    credentials = {...credentials, ...bank};
    credentials.user_id = item.user.id;
    credentials.from = item.user.username;
    credentials.price = price;
    credentials.listing_id = item.id;
    credentials.trader_id = item.user_id;
    credentials.type = item.asset;
    console.log(credentials);
    setFormData(credentials);
    setShowSummary(true);
  };
  const handleTrade = () => {
    if (item.payment_type === 'mycredly wallet') {
      setShowInfo(true);
    } else {
      submitTrade();
    }
  };
  const submitTrade = async () => {
    setShowSummary(false);
    setShowInfo(false);
    // console.log(formData);

    const response = await performAsyncCalls(formData, createTrading);
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
      dispatch(addTrading({trading: response.data}));
      navigate('TransactionBoard', {item, trading: response.data});
    }
  };
  const limitValidator = async (input: any) => {
    if (Number(input) < item.min_value) {
      setMinLimitError(true);
      setLimitErrorText(`minimun value is ${item.min_value}`);
    } else if (Number(input) > item.max_value) {
      setMinLimitError(true);
      setLimitErrorText(`maximum value is ${item.max_value}`);
    } else {
      setMinLimitError(false);
    }
  };
  const calculatePrice = async (amount: any) => {
    console.log(amount * item.price);
    setPrice(String(amount * item.price));
  };
  const renderType = (temp: any) => {
    return (
      <Box style={styles.item}>
        <Text variant={'medium'}>{temp.label}</Text>
      </Box>
    );
  };
  const handlePaymentSelection = (input: any) => {
    console.log(input);
    if (input === 'mycredly wallet') {
      console.log(input);
    } else {
      setShowBank(true);
    }
  };
  const updateBank = (data: any) => {
    setBank(data);
    console.log(bank);
    setShowBank(false);
    // console.log(data);
  };
  return (
    <Container>
      <Header leftIcon={true} text={''} />
      <Loader visible={isLoading} />
      <ModalContainer
        visible={showInfo}
        primaryText="Quick Info"
        secondaryText={`Note: You're makein an internal transaction 
          (Mycredly to mycredly wallet), Your transaction will be conpleted 
          instantly and your wall will be credited immediately`}
        onConfirmed={submitTrade}
        onCancelled={() => setShowInfo(false)}
      />
      {showSummary && (
        <BottomModal
          visible={showSummary}
          action={handleTrade}
          data={formData}
          close={({}) => setShowSummary(false)}
        />
      )}

      <BankModal visible={showBank} close={updateBank} />
      <ScrollView>
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
        <Box
          marginHorizontal={'mx3'}
          marginVertical={'mx3'}
          flex={1}
          paddingVertical={'my3'}
          paddingHorizontal={'mx3'}
          borderRadius={15}
          backgroundColor={'secondary'}>
          <Box>
            <Text variant={'regular'} color="muted" marginLeft="mx1">
              I want to buy
            </Text>
            <Box flexDirection={'row'} justifyContent="center">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Box width={widthPercentageToDP('90%')}>
                    <Input
                      value={value}
                      type={'none'}
                      keyboard={'number-pad'}
                      customStyles={{
                        margin: 0,
                        borderRadius: 30,
                        height: heightPercentageToDP('6%'),
                        marginVertical: heightPercentageToDP('1%'),
                      }}
                      rightBtn={() => (
                        <Text variant={'regular'} fontSize={14} color={'muted'}>
                          {item.asset}
                        </Text>
                      )}
                      placeholder={' Enter Amount'}
                      onChange={input => {
                        onChange(input);
                        calculatePrice(input);
                        limitValidator(input);
                      }}
                    />
                  </Box>
                )}
                name="amount"
              />
            </Box>
            {errors.amount && (
              <Box width={'100%'}>
                <Text
                  variant={'regular'}
                  alignSelf="flex-end"
                  fontSize={10}
                  textAlign="right"
                  color="danger">
                  {errors.amount?.message}
                </Text>
              </Box>
            )}
            {minLimitError && (
              <Box width={'100%'}>
                <Text
                  variant={'regular'}
                  alignSelf="flex-end"
                  fontSize={10}
                  textAlign="right"
                  color="danger">
                  {limitErrorText}
                </Text>
              </Box>
            )}
          </Box>
          <Box>
            <Text variant={'regular'} color="muted" marginLeft="mx1">
              Amount to pay
            </Text>
            <Box flexDirection={'row'} justifyContent="center">
              <Box width={widthPercentageToDP('90%')}>
                <Input
                  value={price}
                  type={'none'}
                  keyboard={'number-pad'}
                  customStyles={{
                    margin: 0,
                    borderRadius: 30,
                    height: heightPercentageToDP('6%'),
                    marginVertical: heightPercentageToDP('1%'),
                  }}
                  rightBtn={() => (
                    <Text variant={'regular'} fontSize={14} color={'muted'}>
                      {item.asset}
                    </Text>
                  )}
                  disabled={false}
                  placeholder={' Enter Amount'}
                  onChange={input => {
                    onChange(input);
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box marginTop={'my2'}>
            <Text variant={'regular'} fontSize={14} color={'muted'}>
              Payment type
            </Text>
            <Box
              flexDirection={'row'}
              marginTop={'my2'}
              justifyContent="space-between">
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Dropdown
                    style={[
                      styles.dropdown,
                      {
                        backgroundColor: background,
                        opacity: 0.8,
                        borderColor: 'transparent',
                      },
                    ]}
                    placeholderStyle={[styles.placeholderStyle, {color: muted}]}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={[
                      {
                        backgroundColor: faint,
                        borderWidth: 0,
                        opacity: 0.8,
                      },
                    ]}
                    data={paymentType}
                    maxHeight={300}
                    width={'100%'}
                    labelField="label"
                    valueField="value"
                    activeColor={background}
                    value={''}
                    onChange={item => handlePaymentSelection(item.value)}
                    renderItem={renderType}
                  />
                )}
                name="payment_type"
              />
            </Box>
            {errors.payment_type && (
              <Box width={'100%'}>
                <Text
                  variant={'regular'}
                  fontSize={10}
                  alignSelf="flex-end"
                  textAlign="right"
                  marginTop={'my1'}
                  color="danger">
                  {errors.payment_type?.message}
                </Text>
              </Box>
            )}
          </Box>

          <Box alignItems={'center'}>
            <Button
              label="Submit"
              onPress={handleSubmit(onSubmit, error => console.log(error))}
              backgroundColor={'transparent'}
              width={widthPercentageToDP('85%')}
              labelStyle={{color: success1, fontWeight: '400'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              borderWidth={0.5}
              borderColor={'success1'}
              alignItems={'center'}
            />
          </Box>
          <Box
            borderWidth={0.5}
            borderBottomColor="muted"
            marginVertical={'my3'}
          />
          <Box>
            <Text variant={'medium'} fontSize={16}>
              Listings Details
            </Text>
            <Text
              variant={'regular'}
              color={'muted'}
              marginVertical={'mx1'}
              fontSize={14}>
              Unit price of Coin
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
              <Text
                variant={'regular'}
                color={'muted'}
                marginVertical={'mx1'}
                fontSize={14}>
                Available
              </Text>
              <Text variant={'regular'} color="foreground" fontSize={16}>
                {item.amount.toFixed(2)}
              </Text>
              <Text
                variant={'regular'}
                marginLeft="mx1"
                color="muted"
                fontSize={10}>
                {item.asset}
              </Text>
            </Box>

            <Box flexDirection={'row'} alignItems={'center'}>
              <Text variant={'regular'} color="muted" fontSize={12}>
                Range
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
                Time Limit
              </Text>
              <Box flexDirection={'row'} alignItems={'flex-end'}>
                <Text
                  variant={'regular'}
                  marginLeft="mx1"
                  color="info"
                  fontSize={12}>
                  {item.time}
                </Text>

                <Text
                  variant={'regular'}
                  marginLeft="mx1"
                  color="info"
                  fontSize={12}>
                  {'mins'}
                </Text>
              </Box>
            </Box>
            <Box flexDirection={'row'} alignItems={'center'}>
              <Text variant={'regular'} color="muted" fontSize={12}>
                Location
              </Text>
              <Box flexDirection={'row'} alignItems={'flex-end'}>
                <Text
                  variant={'regular'}
                  marginLeft="mx1"
                  color="info"
                  fontSize={12}>
                  {'Nigeria'}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            borderWidth={0.5}
            borderBottomColor="muted"
            marginVertical={'my3'}
          />
          {item.terms && (
            <Box>
              <Text variant={'regular'} fontSize={16}>
                Terms
              </Text>
              <Text variant={'regular'}>{item.terms}</Text>
            </Box>
          )}
          {item.instructions && (
            <Box>
              <Text variant={'regular'} fontSize={16}>
                Instructions
              </Text>
              <Text variant={'regular'}>{item.instructions}</Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Container>
  );
};

export default PeerTransaction;

const styles = StyleSheet.create({
  customStyle: {
    paddingTop:
      Platform.OS === 'ios'
        ? heightPercentageToDP('3%')
        : heightPercentageToDP('2%'),
  },
  dropdown: {
    height: 40,
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 18,
    paddingHorizontal: 8,
    width: widthPercentageToDP('88%'),
    color: 'white',
    backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
    height: 20,
    width: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0,
  },
});
