import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Text from '../../Components/Text';
import OtpInputs from 'react-native-otp-inputs';

import Icon from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Links from '../../Components/Links';
import {RFValue} from 'react-native-responsive-fontsize';
import {useEffectOnce} from 'usehooks-ts';
import {
  useConfirmEmailMutation,
  useSignupMutation,
  useVerifyEmailMutation,
} from '../../state/services/userAuth';
import {performAsyncCalls} from '../../helpers/constants';
import {useToast} from 'react-native-toast-notifications';
import {useTimeout} from 'usehooks-ts';
import {useCountdown} from 'usehooks-ts';
import _ from 'lodash';

const Box = createBox();
const EmailOtpVerification = () => {
  const {params} = useRoute();
  const {details, type} = params;
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {background, success, foreground} = theme.colors;
  const {my2, mx2, mx3, s} = theme.spacing;
  const [confirmEmail, {isLoading: confirmLoading}] = useConfirmEmailMutation();
  const [verifyEmail, {isLoading: verifyLoading}] = useVerifyEmailMutation();

  const [intervalValue, setIntervalValue] = useState(1000);
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const [count, {startCountdown, resetCountdown}] = useCountdown({
    countStart: 600,

    intervalMs: intervalValue,
  });
  const resend = () => setVisible(true);
  useTimeout(resend, 600000);
  const toast = useToast();
  useEffectOnce(() => {
    sendOtp();
  });

  const sendOtp = async () => {
    console.log(details.email);
    const response = await performAsyncCalls(
      {email: details.email},
      confirmEmail,
    );
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      setVisible(false);
      resetCountdown();
      startCountdown();
      console.log(response);
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
  };
  const verifyOtp = async () => {
    const response = await performAsyncCalls(
      {email: details.email, code},
      verifyEmail,
    );
    if (response.success === false) {
      console.log('here');
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      if (type === 'register') {
        navigate('PhoneOtpVerification', {details});
      } else {
        navigate('ResetPassword', {details});
      }
    }
  };
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''} ${
      seconds ? `${seconds} second${seconds > 1 ? 's' : ''}` : ''
    }`;
  };

  return (
    <Container style={{justifyContent: 'space-between'}}>
      <Header text={'Verify Email'} />
      <Container
        style={{
          justifyContent: 'flex-start',
          // paddingHorizontal: mx2,
          // paddingVertical: my2,
        }}>
        <Box
          marginHorizontal={'mx4'}
          marginVertical={'my2'}
          borderRadius={15}
          alignItems={'center'}
          // alignSelf={'center'}
          paddingVertical={'my2'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <Box
            marginHorizontal={'s'}
            marginVertical={'my2'}
            maxWidth={widthPercentageToDP('65%')}>
            <Text variant={'bold'} fontSize={RFValue(24)} color="success">
              Email Verification
            </Text>
            <Text
              textAlign={'center'}
              marginVertical={'my1'}
              variant={'medium'}
              color={'muted'}>
              An authentication code has been sent to{' '}
              {details.email.substr(0, 5)}***{details.email.slice(-10)}
            </Text>
          </Box>

          <OtpInputs
            handleChange={code => setCode(code)}
            numberOfInputs={5}
            style={styles.inputContainer}
            inputStyles={[
              styles.containerStyle,
              {backgroundColor: background, color: success},
            ]}
            inputContainerStyles={{}}
          />
          <Box flexDirection={'row'} alignSelf={'center'} marginVertical="my3">
            <Text variant={'medium'} marginRight={'s'}>
              I didn't receive code.
            </Text>
            {visible ? (
              <Links
                onPress={() => {
                  sendOtp();
                  setVisible(false);
                  resetCountdown();
                  startCountdown();
                }}
                text={'Resend Code'}
              />
            ) : (
              <Text variant="regular" color="muted">
                {formatTime(count)}
              </Text>
            )}
          </Box>
          <Button
            label="Verify Now"
            onPress={() => verifyOtp()}
            isloading={verifyLoading}
            backgroundColor={'success'}
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
    </Container>
  );
};

export default EmailOtpVerification;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  containerStyle: {
    backgroundColor: '#343434',
    height: 40,
    width: 40,
    borderRadius: 7,
    paddingHorizontal: 15,
    color: 'white',
    marginHorizontal: 7,
  },
});
