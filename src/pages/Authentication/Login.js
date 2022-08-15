import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import Links from '../../Components/Links';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {performAsyncCalls} from '../../helpers/constants';
import {useLoginMutation} from '../../state/services/userAuth';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../state/reducers/userAuth';
import { RFValue } from 'react-native-responsive-fontsize';

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

const Box = createBox();
const Login = () => {
  const [secure, setSecure] = React.useState(true);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {success, foreground} = theme.colors;
  const {my2, mx3, s} = theme.spacing;
  const toast = useToast();
  const [login, {isLoading}] = useLoginMutation();

  const Login = async credentials => {
    const response = await performAsyncCalls(credentials, login);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      dispatch(
        setCredentials({
          user: response.data.user,
          token: response.data.token,
        }),
      );
      navigate('Dashboard');
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container style={{justifyContent: 'space-between'}}>
      <Header text={'Sign In'} />
      <Container
        style={{
          justifyContent: 'center',
          paddingHorizontal: mx3,
          paddingVertical: my2,
        }}>
        <Box marginHorizontal={'s'}>
          <Text variant={'bold'} fontSize={RFValue(26)} color={'success'}>
            Welcome Back
          </Text>
          <Text variant={'medium'} color={'muted'}>
            Sign in to continue
          </Text>
        </Box>
        <Box
          marginHorizontal={'mx4'}
          marginVertical={'my2'}
          borderRadius={15}
          alignItems={'center'}
          alignSelf={'center'}
          paddingVertical={'my2'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <Input
                label={'Email'}
                value={value}
                type={'emailAddress'}
                placeholder={'Email'}
                onChange={input => {
                  onChange(input);
                }}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.email?.message}
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
                placeholder={'Password'}
                onChange={input => {
                  onChange(input);
                }}
                secure={secure}
                hasError={errors.username ? true : false}
                rightBtn={() => (
                  <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Icon
                      name={secure ? 'eye' : 'eye-with-line'}
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

          <Box marginRight={'mx3'} alignSelf={'flex-end'}>
            <Links
              onPress={() => navigate('ForgotPassword')}
              text={'Forgot Password?'}
            />
          </Box>
          <Button
            label="Login"
            onPress={handleSubmit(Login)}
            backgroundColor={'success'}
            isloading={isLoading}
            childColor={foreground}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </Box>
      </Container>
      <Box flexDirection={'row'} alignSelf={'center'} marginBottom="my3">
        <Text variant={'medium'} marginRight={'s'}>
          Don't have an account?
        </Text>
        <Links onPress={() => navigate('Signup')} text={'Sign Up!'} />
      </Box>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({});
