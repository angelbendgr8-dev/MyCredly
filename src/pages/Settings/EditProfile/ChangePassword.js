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
import {performAsyncCalls} from '../../../helpers/constants';
import {useChangePasswordMutation} from '../../../state/services/SettingsService';
import {useToast} from 'react-native-toast-notifications';

import IonicIcon from 'react-native-vector-icons/Ionicons';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    old_password: yup.string().required('Enter your old password'),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])/, 'One Uppercase')
      .matches(/^(?=.*[a-z])/, 'One Lowercase')
      .matches(/^(?=.*[0-9])/, 'One Number')
      .matches(/^(?=.*[!@#$%^&*])/, 'At least 1 Symbol')
      .matches(/^(?=.{8,})/, 'Must Contain 8 Characters'),
    confirm_password: yup
      .string()
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Your passwords do not match'),
  })
  .required();
const ChangePassword = () => {
  const [secure, setSecure] = useState(true);
  const toast = useToast();
  const {goBack} = useNavigation();
  const [pErrors] = useState([
    'Must Contain 8 Characters',
    'One Uppercase',
    'One Lowercase',
    'One Number',
    'At least 1 Symbol',
  ]);
  const [Ierrors, setErrors] = useState([]);
  const [changePassword, {isLoading}] = useChangePasswordMutation();

  const updatePassword = async credentials => {
    console.log(credentials);
    const response = await performAsyncCalls(credentials, changePassword);
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
      goBack();
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    resolver: yupResolver(schema),
  });
  const formatPasswordError = async password => {
    schema
      .validate(
        {
          password,
        },
        {abortEarly: false},
      )
      .then(() => setErrors([]))
      .catch(e => {
        setErrors(e.errors);
        // console.log(Ierrors);
      });
  };

  return (
    <Container>
      <Header leftIcon={true} text={'Change Password'} />
      <ScrollView>
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
                type={'password'}
                placeholder={'Old Password'}
                onChange={input => {
                  onChange(input);
                  formatPasswordError(input);
                }}
                secure={secure}
                hasError={errors.old_password ? true : false}
                rightBtn={() => (
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <IonicIcon
                      name={secure ? 'eye' : 'eye-off'}
                      color={'white'}
                      size={14}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
            name="old_password"
          />
          {errors.old_password && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.old_password?.message}
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
                type={'password'}
                placeholder={'New Password'}
                onChange={input => {
                  onChange(input);
                  formatPasswordError(input);
                }}
                secure={secure}
                hasError={errors.password ? true : false}
                rightBtn={() => (
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <IonicIcon
                      name={secure ? 'eye' : 'eye-off'}
                      color={'white'}
                      size={14}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.password?.message}
              </Text>
            </Box>
          )}
          <Box marginLeft={'mx4'}>
            {Ierrors.length > 0 ? (
              pErrors.map((item, index) => (
                <Box key={index} flexDirection="row" alignItems="center">
                  <IonicIcon name="radio-button-on" size={13} color="gray" />
                  <Text
                    variant={'regular'}
                    style={{
                      fontSize: 12,
                      marginLeft: 5,
                    }}
                    color={Ierrors.includes(item) ? 'danger' : 'success'}>
                    {item}
                  </Text>
                </Box>
              ))
            ) : (
              <Box />
            )}
          </Box>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={'Name'}
                value={value}
                type={'password'}
                placeholder={'Confirm Password'}
                onChange={input => {
                  onChange(input);
                }}
                secure={secure}
                hasError={errors.confirm_password ? true : false}
                rightBtn={() => (
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <IonicIcon
                      name={secure ? 'eye' : 'eye-off'}
                      color={'white'}
                      size={14}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
            name="confirm_password"
          />
          {errors.confirm_password && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.confirm_password?.message}
              </Text>
            </Box>
          )}
          <Button
            label="Change"
            onPress={handleSubmit(updatePassword)}
            isloading={isLoading}
            backgroundColor={'success'}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
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

export default ChangePassword;

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
