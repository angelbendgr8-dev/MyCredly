import React, {useState} from 'react';
import Container from '../../../Components/Container';
import Box from '../../../Components/Box';
import Text from '../../../Components/Text';
import Header from '../../../Components/Header';
import Clickable from '../../../Components/Clickable';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import {ScrollView} from 'react-native';
import Select from '../../../Components/Select';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useAddAccountMutation} from '../../../state/services/SettingsService';
import {performAsyncCalls} from '../../../helpers/constants';

import {useToast} from 'react-native-toast-notifications';
import { Loader } from '../../../Components/Loader';

const schema = yup
  .object({
    account_name: yup.string().required('Account Name is Required'),
    account_number: yup.string().required('Account Number is Required'),
    bank_name: yup.string().required('Bank Name is Required'),
  })
  .required();

const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];

const AddBanks = () => {
  const [addAccount, {isLoading}] = useAddAccountMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      account_name: '',
      account_number: '',
      bank_name: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async credentials => {
    const response = await performAsyncCalls(credentials, addAccount);
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
      toast.show('Bank Added Successfully', {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      // setPaymentDetails(response.data);
      // navigate('Dashboard');
    }
  };
  return (
    <Box
      marginHorizontal={'mx3'}
      paddingVertical={'my3'}
      paddingHorizontal={'mx3'}
      borderRadius={15}
      backgroundColor={'secondary'}>
      <Loader visible={isLoading} />
      <ScrollView>
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
      </ScrollView>
    </Box>
  );
};

const BanksAndCard = () => {
  const [addBank, setAddBank] = useState(false);
  const [banks] = useState([]);
  const {navigate} = useNavigation();
  return (
    <Container>
      <Header leftIcon={true} />
     
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        marginHorizontal="mx3"
        marginTop={'s'}
        justifyContent="space-between">
        <Text variant={'bold'} fontSize={26}>
          Bank and Cards
        </Text>
        <Clickable
          onPress={() => setAddBank(!addBank)}
          flexDirection={'row'}
          alignItems="center">
          <Icon
            name={addBank ? 'closesquare' : 'plussquare'}
            color={'white'}
            size={14}
          />
          <Text variant={'regular'} marginLeft="s">
            {addBank ? 'Close' : 'Add Bank'}
          </Text>
        </Clickable>
      </Box>
      <Box
        flexDirection={'row'}
        paddingVertical={'my2'}
        paddingHorizontal={'mx2'}>
        <Box
          flex={1}
          alignItems={'center'}
          paddingVertical={'py2'}
          borderRadius={10}
          backgroundColor={'secondary'}
          justifyContent={'center'}>
          <Text variant={'medium'}>Banks</Text>
        </Box>
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <Clickable
            width={widthPercentageToDP('45%')}
            paddingVertical={'py2'}
            onPress={() => navigate('Cards')}>
            <Text textAlign={'center'} variant={'medium'}>
              Cards
            </Text>
          </Clickable>
        </Box>
      </Box>
      {addBank ? (
        <AddBanks />
      ) : (
        <Container>
          {_.isEmpty(banks) ? (
            <Text variant={'medium'}>
              You have no Banks added to your account
            </Text>
          ) : (
            <Text variant={'medium'}>Bank Lists</Text>
          )}
        </Container>
      )}
    </Container>
  );
};

export default BanksAndCard;
