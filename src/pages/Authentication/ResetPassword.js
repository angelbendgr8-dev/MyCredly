import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';

import IonicIcon from 'react-native-vector-icons/Ionicons';

import {widthPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Links from '../../Components/Links';

import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {performAsyncCalls} from '../../helpers/constants';
import {useResetPasswordMutation} from '../../state/services/userAuth';
import {useToast} from 'react-native-toast-notifications';

const schema = yup
  .object({
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

const Box = createBox();
const ResetPassword = () => {
  const [secure, setSecure] = React.useState(true);
  const {params} = useRoute();
  const {details} = params;
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {success, foreground} = theme.colors;
  const {my2, mx3, s} = theme.spacing;
  const toast = useToast();
  const [pErrors] = useState([
    'Must Contain 8 Characters',
    'One Uppercase',
    'One Lowercase',
    'One Number',
    'At least 1 Symbol',
  ]);
  const [Ierrors, setErrors] = useState([]);
  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  const ResetPassword = async credentials => {
    const formdata = {
      email: details.email,
      password: credentials.password,
    };
    const response = await performAsyncCalls(formdata, resetPassword);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      navigate('Dashboard');
    }
  };
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

  return (
    <Container style={{justifyContent: 'space-between'}}>
      <Header text={'Reset Password'} />
      <Container
        style={{
          justifyContent: 'flex-start',
          paddingHorizontal: mx3,
          paddingVertical: my2,
        }}>
        <Box marginHorizontal={'s'}>
          <Text variant={'bold'} color={'success'} />
          <Text variant={'medium'} textAlign='center' color={'muted'}>
            Enter New Password
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
                label={'Name'}
                value={value}
                type={'password'}
                placeholder={'Password'}
                onChange={input => {
                  onChange(input);
                  formatPasswordError(input);
                }}
                secure={secure}
                hasError={errors.password ? true : false}
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

          {/* <Box marginRight={'mx3'} alignSelf={'flex-end'}>
            <Links
              onPress={() => navigate('Login')}
              text={'Remember Password?'}
            />
          </Box> */}
          <Button
            label="Reset"
            onPress={handleSubmit(ResetPassword)}
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
          Remember my password?
        </Text>
        <Links onPress={() => navigate('Login')} text={'Login!'} />
      </Box>
    </Container>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
