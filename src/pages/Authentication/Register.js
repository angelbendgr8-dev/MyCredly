import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';
import IonicIcon from 'react-native-vector-icons/Ionicons';

import PhoneInput from 'react-native-phone-number-input';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import Links from '../../Components/Links';
import {RFValue} from 'react-native-responsive-fontsize';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useDebounce, useTimeout} from 'usehooks-ts';
import {
  useCheckEmailMutation,
  useCheckUsernameMutation,
} from '../../state/services/userAuth';
import {performAsyncCalls} from '../../helpers/constants';
import _ from 'lodash';

const schema = yup
  .object({
    first_name: yup
      .string()
      .required('First name is required')
      .matches(/^([^0-9]*)$/, 'No numbers allowed'),
    last_name: yup
      .string()
      .required('Last name is required')
      .matches(/^([^0-9]*)$/, 'No numbers allowed'),
    username: yup.string().required('Username is required'),
    email: yup
      .string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    mobile_number: yup.string().max(255).required('Mobile Number is required'),
    country: yup.string(),
    password: yup
      .string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])/, 'One Uppercase')
      .matches(/^(?=.*[a-z])/, 'One Lowercase')
      .matches(/^(?=.*[0-9])/, 'One Number')
      .matches(/^(?=.*[!@#$%^&*])/, 'At least 1 Symbol')
      .matches(/^(?=.{8,})/, 'Must Contain 8 Characters'),
    referral_code: yup.string(),
  })
  .required();

const Box = createBox();
const Register = () => {
  const [secure, setSecure] = React.useState(true);
  const [formattedValue, setFormattedValue] = useState('');
  const [agree, setAgree] = useState(false);
  const phoneInput = React.useRef();
  const {navigate} = useNavigation();
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState();
  const [code, setCode] = useState('');
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [emailAvail, setEmailAvail] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameAvail, setUsernameAvail] = useState(false);
  const [checkEmail, {isLoading: emailCheckLoading}] = useCheckEmailMutation();
  const [checkUsername, {isLoading: usernameCheckLoading}] =
    useCheckUsernameMutation();
  const {background, success, danger, foreground} = theme.colors;
  const {s} = theme.spacing;
  const debouncedEmail = useDebounce(email, 1500);
  const debouncedUsername = useDebounce(username, 1500);

  const [pErrors] = useState([
    'Must Contain 8 Characters',
    'One Uppercase',
    'One Lowercase',
    'One Number',
    'At least 1 Symbol',
  ]);
  const [Ierrors, setErrors] = useState([]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      username: '',
      mobile_number: '',
      country: 'Nigeria',
      code: '234',
      email: '',
      password: '',
      referral_code: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = credentials => {
    if (usernameAvail && emailAvail) {
    } else {
      navigate('EmailOtpVerification', {
        details: credentials,
        type: 'register',
      });
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

  useEffect(() => {
    validateEmail();
  }, [debouncedEmail, validateEmail]);
  useEffect(() => {
    validateUsername();
  }, [debouncedUsername, validateUsername]);

  const validateNumber = useCallback(async () => {}, []);
  const validateEmail = useCallback(async () => {
    if (email) {
      const response = await performAsyncCalls({email: email}, checkEmail);
      if (response.success === false) {
        setEmailAvail(true);
      } else {
        setEmailAvail(false);
      }
    }
  }, [checkEmail, email]);
  const validateUsername = useCallback(async () => {
    if (username) {
      const response = await performAsyncCalls(
        {username: username},
        checkUsername,
      );
      if (response.success === false) {
        setUsernameAvail(true);
      } else {
        setUsernameAvail(false);
      }
    }
  }, [checkUsername, username]);
  return (
    <Container>
      <Header text={'Sign Up'} />
      <ScrollView>
        <Box
          flex={1}
          marginHorizontal={'mx4'}
          marginVertical={'my2'}
          borderRadius={15}
          alignItems={'center'}
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
                label={'First Name'}
                value={value}
                type={'name'}
                placeholder={'First Name'}
                onChange={input => onChange(input)}
                hasError={errors.first_name ? true : false}
              />
            )}
            name="first_name"
          />
          {errors.first_name && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.first_name?.message}
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
                label={'Last Name'}
                value={value}
                type={'name'}
                placeholder={'Last Name'}
                onChange={input => onChange(input)}
                hasError={errors.last_name ? true : false}
              />
            )}
            name="last_name"
          />
          {errors.last_name && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.last_name?.message}
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
                label={'Username'}
                value={value}
                type={'nickname'}
                placeholder={'Username'}
                onChange={input => {
                  onChange(input);
                  setUsername(input);
                }}
                hasError={errors.username ? true : false}
                rightBtn={() =>
                  !_.isEmpty(username) &&
                  !usernameAvail && (
                    <IonicIcon
                      name={'checkmark-done-circle'}
                      color={success}
                      size={26}
                    />
                  )
                }
              />
            )}
            name="username"
          />
          {errors.username && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.username?.message}
              </Text>
            </Box>
          )}
          {usernameAvail && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                'Username is unavailable'
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
                label={'Email'}
                value={value}
                type={'emailAddress'}
                placeholder={'Email'}
                onChange={input => {
                  setEmail(input);
                  onChange(input);
                }}
                rightBtn={() =>
                  !_.isEmpty(email) &&
                  !emailAvail && (
                    <IonicIcon
                      name={'checkmark-done-circle'}
                      color={success}
                      size={26}
                    />
                  )
                }
                hasError={errors.username ? true : false}
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
          {emailAvail && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                'Email is unavailable'
              </Text>
            </Box>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="NG"
                layout="first"
                onChangeCountry={country => {
                  console.log(country.callingCode[0]);
                  setCountry(country.name);
                }}
                onChangeText={text => {
                  setPhone(text);
                  onChange(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                containerStyle={{
                  height: heightPercentageToDP('7%'),
                  marginHorizontal: widthPercentageToDP('2%'),
                  marginVertical: 10,
                  backgroundColor: background,
                  borderRadius: 30,
                  width: widthPercentageToDP('85%'),
                  borderWidth: errors.mobile_number ? 0.5 : 0,
                  borderColor: danger,
                }}
                codeTextStyle={{color: foreground}}
                textContainerStyle={{
                  borderRadius: 45,
                  backgroundColor: background,
                }}
                textInputStyle={{height: 40, marginTop: 1, color: 'white'}}
              
              />
            )}
            name="mobile_number"
          />
          {errors.mobile_number && (
            <Box width={'100%'}>
              <Text
                variant={'regular'}
                alignSelf="flex-end"
                textAlign="right"
                color="danger">
                {errors.mobile_number?.message}
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
                  formatPasswordError(input);
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
          <Input
            label={'Referral'}
            value={''}
            type={'none'}
            placeholder={'Referral(Optional)'}
            onChange={input => {}}
          />
          <Box flexDirection={'row'} marginTop={'my2'} marginHorizontal={'my3'}>
            <CheckBox
              disabled={false}
              value={agree}
              tintColors={{true: success, false: 'white'}}
              onValueChange={newValue => setAgree(newValue)}
            />
            <Text variant={'medium'} fontSize={RFValue(13)}>
              By creating an account you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </Box>
          <Button
            label="Sign Up"
            onPress={handleSubmit(onSubmit)}
            backgroundColor={'success'}
            childColor={foreground}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            disabled={!agree}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
          <Box flexDirection={'row'}>
            <Text variant={'medium'} marginRight={'s'}>
              Already have an account?
            </Text>
            <Links onPress={() => navigate('Login')} text={'Sign in!'} />
          </Box>
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({});
