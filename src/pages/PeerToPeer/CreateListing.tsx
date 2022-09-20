import {Image, Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Text from '../../Components/Text';
import Box from '../../Components/Box';
import Header from '../../Components/Header';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {useTheme} from '@shopify/restyle';
import {useGetWalletTypesQuery} from '../../state/services/misc.services';
import {Loader} from '../../Components/Loader';
import {
  assetUrl,
  currencyFormat,
  performAsyncCalls,
} from '../../helpers/constants';
import {Dropdown} from 'react-native-element-dropdown';
import _ from 'lodash';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import {useGetConversionRateQuery} from '../../state/services/conversion.services';
import Button from '../../Components/Button';

import Modal from 'react-native-modal';
type Props = {
  coin: string;
  price: string;
  amount: string;
  fee: string;
  limit: string;
  total: string;
  secondaryText: string;
  onConfirmed: () => void;
  onCancelled: () => void;
  visible: boolean;
};

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDebounce} from 'usehooks-ts';
import * as yup from 'yup';
import {useToast} from 'react-native-toast-notifications';
import {useCreateListingMutation} from '../../state/services/transactions.services';
import {useDispatch} from 'react-redux';
import {addListing} from '../../state/reducers/transactions.reducer';
import {useNavigation} from '@react-navigation/native';

const schema = yup
  .object({
    type: yup.string().required('Listing type is required'),
    asset: yup.string().required('Asset type is required'),
    pricing: yup.string().required('Pricing is required'),
    price: yup.number().required('Price rate is required'),
    amount: yup.number().required('amount is required'),
    selling_price: yup.number().required('minimum deposit is 2000'),
    max_value: yup.number().required('max range is required'),
    min_value: yup.number().required('minimum limit is required'),
    payment_type: yup.string().required('Payment type is required'),
    time: yup.string().required('time is required'),
    terms: yup.string(),
    instructions: yup.string(),
  })
  .required();

const PreviewListing: React.FC<Props> = ({
  coin,
  price,
  amount,
  fee,
  limit,
  total,
  onConfirmed,
  onCancelled,
  visible,
}: Props) => {
  // const {showModal} = useContext(AppContext);
  return (
    <Box>
      <Modal isVisible={visible}>
        <Box
          backgroundColor={'secondary'}
          paddingTop={'my3'}
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'center'}>
          <Text variant={'medium'} color={'success1'}>
            Preview Listing
          </Text>
          <Box
            width={'100%'}
            backgroundColor="background"
            marginTop={'my2'}
            marginHorizontal={'mx3'}
            borderBottomEndRadius={10}
            borderBottomStartRadius={10}>
            <Box paddingLeft="my4">
              <Box flexDirection={'row'}>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  color={'muted'}>
                  Coin:
                </Text>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  marginLeft="mx2"
                  color={'muted'}>
                  {coin}
                </Text>
              </Box>
              <Box flexDirection={'row'}>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  color={'muted'}>
                  Price:
                </Text>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  marginLeft="mx2"
                  color={'muted'}>
                  {price}
                </Text>
              </Box>
              <Box flexDirection={'row'}>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  color={'muted'}>
                  Amount Seen:
                </Text>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  marginLeft="mx2"
                  color={'muted'}>
                  {amount}
                </Text>
              </Box>
              <Box flexDirection={'row'}>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  color={'muted'}>
                  Limit:
                </Text>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  marginLeft="mx2"
                  color={'muted'}>
                  {limit}
                </Text>
              </Box>
              <Box flexDirection={'row'}>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  color={'muted'}>
                  Total coin value:
                </Text>
                <Text
                  variant={'regular'}
                  marginVertical={'my2'}
                  marginLeft="mx2"
                  color={'muted'}>
                  {total}
                </Text>
              </Box>
            </Box>
            <Box
              // backgroundColor={'danger'}
              justifyContent={'space-around'}
              width={'100%'}
              flexDirection={'row'}>
              <Button
                label="Cancel"
                onPress={onCancelled}
                //   backgroundColor={'pink'}
                flex={1}
                width={100}
                labelStyle={{color: 'white'}}
                paddingVertical={'my1'}
                marginVertical={'my3'}
                borderRadius={30}
                alignItems={'center'}
                style={{backgroundColor: 'rgba(247,59,113,0.2)'}}
              />
              <Button
                label="Sure"
                onPress={onConfirmed}
                backgroundColor={'success1'}
                width={100}
                labelStyle={{color: 'white'}}
                paddingVertical={'my1'}
                marginVertical={'my3'}
                borderRadius={30}
                alignItems={'center'}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const CreateListing = () => {
  const listingType = [
    {label: 'Fixed Price', value: 'fixed'},
    {label: 'Dynamic Price', value: 'dynamic'},
  ];
  const paymentType = [
    {label: 'Mycredly wallet', value: 'Mycredly wallet'},
    {label: 'Bank Payment', value: 'Bank Transfer'},
  ];
  const paymentTime = [
    {label: '15 mins', value: '15'},
    {label: '30 mins', value: '30'},
  ];
  const theme = useTheme();
  const {muted, success1, background, faint} = theme.colors;
  const {data, isLoading} = useGetWalletTypesQuery();
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState('BTC');
  const [listing, setListing] = useState('buy');
  const [type, setType] = useState(listingType[0].value);
  const [sType, setSType] = useState(listingType[0]);
  const [sPayment, setSPayment] = useState(listingType[0]);
  const [pType, setPType] = useState(paymentType[0].value);
  const [time, setTime] = useState(paymentTime[0]);
  const [timeValue, setTimeValue] = useState(paymentTime[0].value);
  const [icon, setIcon] = useState('');
  const [selected, setSelected] = useState(coins ? coins[0] : []);
  const [skip, setSkip] = useState(true);
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(0);
  const [maxLimitError, setMaxLimitError] = useState(false);
  const [minlimitError, setMinLimitError] = useState(false);
  const debouncedValue = useDebounce<number>(minLimit, 1000);
  const debouncedMaxLimit = useDebounce<number>(maxLimit, 1000);
  const [showPreview, setshowPreview] = useState(false);
  const toast = useToast();
  const {goBack} = useNavigation();
  const [createListing, {isLoading: creatingListing}] =
    useCreateListingMutation();
  const dispatch = useDispatch();
  const {data: conversion} = useGetConversionRateQuery(
    {
      symbol: selected?.label,
      convert: 'NGN',
      amount: 1,
    },
    {skip},
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      type: 'buy',
      asset: 'BTC',
      pricing: '',
      price: 0,
      amount: 0,
      selling_price: 0,
      min_value: 0,
      max_value: 0,
      payment_type: '',
      time: '',
      terms: '',
      instructions: '',
    },
    resolver: yupResolver(schema),
  });

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Image
          source={{uri: `${assetUrl()}${item.icon}`}}
          style={styles.icon}
        />
        <Text variant={'medium'}>{item.label}</Text>
      </View>
    );
  };
  const renderType = (item: any) => {
    return (
      <View style={styles.item}>
        <Text variant={'medium'}>{item.label}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (data) {
      setCoins(data.data);
      // console.log('here');
    }
  }, [data]);

  useEffect(() => {
    if (!_.isEmpty(coins)) {
      setSelected(coins[0]);
      setIcon(coins[0].icon);
      setCoin(coins[0].value);
      setSkip(false);
    }
  }, [coins]);

  useEffect(() => {
    if (conversion) {
      setRate(conversion.data);
      console.log();
      setSkip(true);
    }
  }, [conversion]);
  useEffect(() => {
    setCoinValue(price * amount);
  }, [price, amount]);

  useEffect(() => {}, [coinValue, minLimit]);

  useEffect(() => {
    if (Number(minLimit) > Number(amount)) {
      setMinLimitError(true);
    } else {
      setMinLimitError(false);
    }
  }, [debouncedValue]);
  useEffect(() => {
    if (
      Number(maxLimit) < Number(minLimit) ||
      Number(maxLimit) > Number(amount)
    ) {
      setMaxLimitError(true);
    } else {
      setMaxLimitError(false);
    }
  }, [debouncedMaxLimit]);

  const optionData: RadioButtonProps[] = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'I want to buy',
      value: 'buy',
      labelStyle: {color: muted},
      selected: true,
      color: success1,
    },
    {
      id: '2',
      label: 'I want to sell',
      value: 'sell',
      labelStyle: {color: muted},
      color: success1,
    },
  ];

  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(optionData);

  function onPressRadioButton(radioOptions: RadioButtonProps[]) {
    radioButtons.map(item => {
      if (item.selected === true) {
        setListing(item.value);
      }
    });
    setRadioButtons(radioOptions);
  }
  const onSubmit = async credentials => {
    setshowPreview(false);
    credentials.type = listing;
    credentials.value = price * amount;
    const response = await performAsyncCalls(credentials, createListing);
    // console.log(response);
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
      dispatch(addListing({listing: response.data}));
      goBack();
    }
  };
  const onError = errors => {
    console.log(errors);
  };
  return (
    <Container>
      <Header leftIcon={'true'} text={'Create Listing'} />
      <PreviewListing
        visible={showPreview}
        coin={selected?.label}
        price={`${price} ${selected?.label}`}
        amount={`${amount} ${selected?.label}`}
        limit={`${minLimit} ${selected?.label} min `}
        total={`${currencyFormat(price * amount)} NGN`}
        onCancelled={() => setshowPreview(false)}
        onConfirmed={handleSubmit(onSubmit, onError)}
      />
      <Loader visible={isLoading || creatingListing} />
      <ScrollView>
        <Box
          marginHorizontal={'mx3'}
          marginVertical={'mx3'}
          flex={1}
          paddingVertical={'my3'}
          paddingHorizontal={'mx3'}
          borderRadius={15}
          backgroundColor={'secondary'}>
          <Box>
            <Box>
              <Text variant={'regular'} color={'foreground'}>
                What do you want to do
              </Text>
              <Box marginVertical={'my2'}>
                <RadioGroup
                  radioButtons={radioButtons}
                  onPress={onPressRadioButton}
                  layout="row"
                />
              </Box>
            </Box>
            <Box
              borderWidth={0.5}
              borderBottomColor="muted"
              marginVertical={'my3'}
            />
            <Box>
              <Text variant={'regular'} color={'foreground'}>
                Set Listing Options
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
                          backgroundColor: faint,
                          opacity: 0.8,
                          borderColor: 'white',
                        },
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      containerStyle={[
                        {backgroundColor: faint, borderWidth: 0, opacity: 0.8},
                      ]}
                      data={data && _.size(coins) > 0 ? coins : []}
                      maxHeight={300}
                      width={'50%'}
                      labelField="label"
                      valueField="value"
                      activeColor={background}
                      value={coin}
                      onChange={item => {
                        setCoin(item.value);
                        setSelected(item);
                        setIcon(item.icon);
                        setSkip(false);
                        onChange(item.label);
                      }}
                      renderLeftIcon={() => (
                        <Image
                          style={styles.icon}
                          source={{uri: `${assetUrl()}${icon}`}}
                        />
                      )}
                      renderItem={renderItem}
                    />
                  )}
                  name="asset"
                />
                {errors.asset && (
                  <Box width={'100%'}>
                    <Text
                      variant={'regular'}
                      alignSelf="flex-end"
                      textAlign="right"
                      color="danger">
                      {errors.asset?.message}
                    </Text>
                  </Box>
                )}
                <Box>
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
                            backgroundColor: faint,
                            opacity: 0.8,
                            borderColor: 'white',
                          },
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        containerStyle={[
                          {
                            backgroundColor: faint,
                            borderWidth: 0,
                            opacity: 0.8,
                          },
                        ]}
                        data={listingType}
                        maxHeight={300}
                        width={'50%'}
                        labelField="label"
                        valueField="value"
                        activeColor={background}
                        value={type}
                        onChange={item => {
                          setType(item.value);
                          setSType(item);
                          onChange(item.value);
                        }}
                        renderItem={renderType}
                      />
                    )}
                    name="pricing"
                  />
                  {errors.pricing && (
                    <Box width={'100%'}>
                      <Text
                        variant={'regular'}
                        fontSize={14}
                        alignSelf="flex-end"
                        textAlign="right"
                        marginTop={'my1'}
                        color="danger">
                        {errors.pricing?.message}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              borderWidth={0.5}
              borderBottomColor="muted"
              marginVertical={'my3'}
            />
            <Box marginTop={'my2'}>
              <Text variant={'regular'} color="muted" marginLeft="mx1">
                Price
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
                        placeholder={' Enter Price'}
                        disabled={true}
                        onChange={input => {
                          setPrice(input);
                          onChange(input);
                        }}
                      />
                    </Box>
                  )}
                  name="price"
                />
              </Box>
              {errors.price && (
                <Box width={'100%'}>
                  <Text
                    variant={'regular'}
                    fontSize={14}
                    alignSelf="flex-end"
                    fontSize={10}
                    textAlign="right"
                    marginTop={'my1'}
                    color="danger">
                    {errors.price?.message}
                  </Text>
                </Box>
              )}
              <Text
                variant={'regular'}
                fontSize={14}
                color="muted"
                marginLeft="mx1">
                Current Market Rate: 1 {selected?.label} ={' '}
                {currencyFormat(rate, '₦', 2)}
              </Text>
            </Box>
            <Box marginTop={'my2'}>
              <Text variant={'regular'} color="muted" marginLeft="mx1">
                Amount of {selected?.label}
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
                          <Text variant={'regular'} color={'muted'}>
                            {selected?.label}
                          </Text>
                        )}
                        placeholder={'Enter minimum amount'}
                        onChange={input => {
                          setAmount(input);
                          onChange(input);
                          setCoinValue(price * amount);
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
            </Box>
            <Box marginTop={'my2'}>
              <Text variant={'regular'} color="muted" marginLeft="mx1">
                Coin Value
              </Text>
              <Box flexDirection={'row'} justifyContent="center">
                <Box width={widthPercentageToDP('90%')}>
                  <Box
                    backgroundColor={'background'}
                    flexDirection="row"
                    justifyContent={'space-between'}
                    borderRadius={15}
                    paddingHorizontal={'mx3'}
                    alignItems={'center'}
                    style={{
                      margin: 0,
                      borderRadius: 30,
                      height: heightPercentageToDP('6%'),
                      marginVertical: heightPercentageToDP('1%'),
                    }}>
                    <Text variant={'regular'} color={'muted'}>
                      {(price * amount).toFixed(2)}
                    </Text>
                    <Text variant={'regular'} color={'muted'}>
                      {'NGN'}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              borderWidth={0.5}
              borderBottomColor="muted"
              marginVertical={'my3'}
            />
            <Box>
              <Text variant={'regular'} color="muted" marginLeft="mx1">
                Set Limit
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
                          <Text
                            variant={'regular'}
                            fontSize={14}
                            color={'muted'}>
                            {'Min Limit'}
                          </Text>
                        )}
                        placeholder={' Enter Amount'}
                        onChange={input => {
                          onChange(input);
                          setMinLimit(input);
                        }}
                      />
                    </Box>
                  )}
                  name="min_value"
                />
              </Box>
              {errors.min_value && (
                <Box width={'100%'}>
                  <Text
                    variant={'regular'}
                    alignSelf="flex-end"
                    fontSize={10}
                    textAlign="right"
                    color="danger">
                    {errors.min_value?.message}
                  </Text>
                </Box>
              )}
              {minlimitError && (
                <Box width={'100%'}>
                  <Text
                    variant={'regular'}
                    alignSelf="flex-end"
                    fontSize={10}
                    textAlign="right"
                    color="danger">
                    Min coin amount must be betweeen 0 and {amount}{' '}
                    {selected?.label}
                  </Text>
                </Box>
              )}

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
                          <Text
                            variant={'regular'}
                            fontSize={14}
                            color={'muted'}>
                            {'Max Limit'}
                          </Text>
                        )}
                        placeholder={' Enter Amount'}
                        onChange={input => {
                          onChange(input);
                          setMaxLimit(input);
                        }}
                      />
                    </Box>
                  )}
                  name="max_value"
                />
              </Box>
              {errors.max_value && (
                <Box width={'100%'}>
                  <Text
                    variant={'regular'}
                    alignSelf="flex-end"
                    fontSize={10}
                    textAlign="right"
                    color="danger">
                    {errors.min_value?.message}
                  </Text>
                </Box>
              )}
              {maxLimitError && (
                <Box width={'100%'}>
                  <Text
                    variant={'regular'}
                    alignSelf="flex-end"
                    fontSize={10}
                    textAlign="right"
                    color="danger">
                    Min coin amount must be betweeen {minLimit} and {amount}{' '}
                    {selected?.label}
                  </Text>
                </Box>
              )}
            </Box>

            <Box
              borderWidth={0.5}
              borderBottomColor="muted"
              marginVertical={'my3'}
            />
            <Box flexDirection={'row'} justifyContent={'space-between'}>
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
                            backgroundColor: faint,
                            opacity: 0.8,
                            borderColor: 'white',
                            width: widthPercentageToDP('35%'),
                          },
                        ]}
                        placeholderStyle={[
                          styles.placeholderStyle,
                          {color: muted},
                        ]}
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
                        value={pType}
                        onChange={item => {
                          setPType(item.value);
                          onChange(item.value);
                          setSPayment(item);
                        }}
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
              <Box marginTop={'my2'}>
                <Text variant={'regular'} fontSize={14} color={'muted'}>
                  Payment Time
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
                            backgroundColor: faint,
                            opacity: 0.8,
                            borderColor: 'white',
                            width: widthPercentageToDP('35%'),
                          },
                        ]}
                        placeholderStyle={[
                          styles.placeholderStyle,
                          {color: muted},
                        ]}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        containerStyle={[
                          {
                            backgroundColor: faint,
                            borderWidth: 0,
                            opacity: 0.8,
                          },
                        ]}
                        data={paymentTime}
                        maxHeight={300}
                        width={'100%'}
                        labelField="label"
                        valueField="value"
                        activeColor={background}
                        value={timeValue}
                        onChange={item => {
                          setTimeValue(item.value);
                          onChange(item.value);
                          setTime(item);
                        }}
                        renderItem={renderType}
                      />
                    )}
                    name="time"
                  />
                </Box>
                {errors.time && (
                  <Box width={'100%'}>
                    <Text
                      variant={'regular'}
                      fontSize={10}
                      alignSelf="flex-end"
                      textAlign="right"
                      marginTop={'my1'}
                      color="danger">
                      {errors.time?.message}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>

            <Box
              borderWidth={0.5}
              borderBottomColor="muted"
              marginVertical={'my3'}
            />
            <Box>
              <Box marginTop={'my2'}>
                <Text
                  variant={'regular'}
                  fontSize={14}
                  color="muted"
                  marginLeft="mx1">
                  Listing Term
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
                          customStyles={{
                            margin: 0,
                            borderRadius: 30,
                            height: heightPercentageToDP('10%'),
                            marginVertical: heightPercentageToDP('1%'),
                          }}
                          multiline={true}
                          placeholder={'State Term for your listing'}
                          onChange={input => onChange(input)}
                        />
                      </Box>
                    )}
                    name="terms"
                  />
                </Box>
                {errors.terms && (
                  <Box width={'100%'}>
                    <Text
                      variant={'regular'}
                      fontSize={10}
                      alignSelf="flex-end"
                      textAlign="right"
                      marginTop={'my1'}
                      color="danger">
                      {errors.terms?.message}
                    </Text>
                  </Box>
                )}
                <Text
                  variant={'regular'}
                  fontSize={14}
                  textAlign={'right'}
                  color="muted"
                  marginLeft="mx1">
                  0/200
                </Text>
              </Box>
              <Box marginTop={'my2'}>
                <Text
                  variant={'regular'}
                  fontSize={14}
                  color="muted"
                  marginLeft="mx1">
                  Listing Instruction
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
                          customStyles={{
                            margin: 0,
                            borderRadius: 30,
                            height: heightPercentageToDP('10%'),
                            marginVertical: heightPercentageToDP('1%'),
                          }}
                          multiline={true}
                          placeholder={'List instructions for your listing'}
                          onChange={input => onChange(input)}
                        />
                      </Box>
                    )}
                    name="instructions"
                  />
                </Box>
                {errors.instructions && (
                  <Box width={'100%'}>
                    <Text
                      variant={'regular'}
                      fontSize={10}
                      alignSelf="flex-end"
                      textAlign="right"
                      marginTop={'my1'}
                      color="danger">
                      {errors.instructions?.message}
                    </Text>
                  </Box>
                )}
                <Text
                  variant={'regular'}
                  fontSize={14}
                  textAlign={'right'}
                  color="muted"
                  marginLeft="mx1">
                  0/200
                </Text>
              </Box>
            </Box>
            <Box alignItems={'center'}>
              <Button
                label="Create Listing"
                onPress={() => setshowPreview(true)}
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
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default CreateListing;

const styles = StyleSheet.create({
  customStyle: {
    paddingTop:
      Platform.OS === 'ios'
        ? heightPercentageToDP('3%')
        : heightPercentageToDP('2%'),
  },
  dropdown: {
    height: 35,
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: widthPercentageToDP('42%'),
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
