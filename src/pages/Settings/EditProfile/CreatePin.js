import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import Container from '../../../Components/Container';
import Button from '../../../Components/Button';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Input from '../../../Components/Input';
import Box from '../../../Components/Box';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from '../../../Components/Text';
import Header from '../../../Components/Header';
import {useNavigation} from '@react-navigation/native';

import IonicIcon from 'react-native-vector-icons/Ionicons';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {performAsyncCalls} from '../../../helpers/constants';
import {useToast} from 'react-native-toast-notifications';
import {useCreatePinMutation} from '../../../state/services/SettingsService';
import {useDispatch} from 'react-redux';
import {updateCredentials} from '../../../state/reducers/userAuth';
import {useAuth} from '../../../state/hooks/userAuth';

const schema = yup
  .object({
    pin: yup
      .string()
      .required('Pin is required')
      .matches(/^(?=.{6})/, 'Must Contain 6 Characters'),
    confirm_pin: yup
      .string()
      .required('Confimation pin is required')
      .oneOf([yup.ref('pin')], 'Your pin do not match'),
  })
  .required();
const CreatePin = () => {
  const {goBack, navigate} = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const {user} = useAuth();
  const [createPin, {isLoading}] = useCreatePinMutation();

  const onSubmit = async credentials => {
    credentials.code = user.code ? user.code : '234';
    credentials.mobile_number = user.mobile_number;
    if (user.has_pin) {
      console.log(credentials);
      navigate('VerifyPin', {
        details: credentials,
        action: createPin,
      });
    } else {
      const response = await performAsyncCalls(credentials, createPin);
      console.log(response);
      if (response.success === false) {
        toast.show(response.message, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      } else {
        toast.show(response.message, {
          type: 'success',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
        dispatch(updateCredentials({user: response.data}));
        goBack();
      }
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      pin: '',
      confirm_pin: '',
    },
    resolver: yupResolver(schema),
  });
  return (
    <Container>
      <Header
        leftIcon={true}
        text={user.has_pin ? 'Update Pin' : 'Create Pin'}
      />
      <ScrollView>
        <Box
          width={widthPercentageToDP('80%')}
          alignSelf="center"
          justifyContent="center"
          marginTop={'m'}
          alignItems={'center'}>
          <Text variant={'medium'} textAlign="center" color="muted">
            Create a transaction pin to authorise all your outward transaction
            on MyCredly Transaction pin must be up to 6-digitss
          </Text>
        </Box>
        <Box
          flex={1}
          marginHorizontal={'mx4'}
          marginVertical={'my4'}
          borderRadius={15}
          alignItems={'center'}
          paddingVertical={'my4'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={'Name'}
                value={value}
                type={'none'}
                max={6}
                keyboard="phone-pad"
                placeholder={'Pin'}
                onChange={input => {
                  onChange(input);
                }}
                hasError={errors.pin ? true : false}
              />
            )}
            name="pin"
          />
          {errors.pin && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.pin?.message}
              </Text>
            </Box>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={'Name'}
                value={value}
                type={'none'}
                max={6}
                keyboard="phone-pad"
                placeholder={'Confirm Pin'}
                onChange={input => {
                  onChange(input);
                }}
                hasError={errors.confirm_pin ? true : false}
              />
            )}
            name="confirm_pin"
          />
          {errors.confirm_pin && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.confirm_pin?.message}
              </Text>
            </Box>
          )}
          <Button
            label="Save Now"
            onPress={handleSubmit(onSubmit)}
            isloading={isLoading}
            backgroundColor={'success'}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
            keyboard="phone-pad"
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default CreatePin;

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
