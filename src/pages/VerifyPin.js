import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../Components/Container';
import Header from '../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Text from '../Components/Text';
import OtpInputs from 'react-native-otp-inputs';

import Icon from 'react-native-vector-icons/Entypo';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../Components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import Links from '../Components/Links';
import {RFValue} from 'react-native-responsive-fontsize';
import {performAsyncCalls} from '../helpers/constants';
import {
  useConfirmMobileMutation,
  useSignupMutation,
  useVerifyMobileMutation,
} from '../state/services/userAuth';
import {useCountdown, useEffectOnce, useTimeout} from 'usehooks-ts';
import {useToast} from 'react-native-toast-notifications';
import {setCredentials, updateCredentials} from '../state/reducers/userAuth';
import {useDispatch} from 'react-redux';
import {useCreatePinMutation} from '../state/services/SettingsService';
import _ from 'lodash';

const Box = createBox();
const VerifyPin = () => {
  const {params} = useRoute();
  const {details, action} = params;
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {background, success, foregorund} = theme.colors;
  const [confirmMobile, {isLoading: confirmLoading}] =
    useConfirmMobileMutation();
  const [verifyMobile, {isLoading: verifyLoading}] = useVerifyMobileMutation();
  const [signup, {isLoading: signupLoading}] = useSignupMutation();
  const [code, setCode] = useState('');
  const [intervalValue, setIntervalValue] = useState(1000);
  const [visible, setVisible] = useState(true);
  const [createPin, {isLoading: pinLoading}] = useCreatePinMutation();
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
    const mobile_number = `+${details.code}${details.mobile_number}`;

    const response = await performAsyncCalls({mobile_number}, confirmMobile);
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
  const verifyOtp = async code => {
    const mobile_number = `+${details.code}${details.mobile_number}`;
    console.log(mobile_number);
    const response = await performAsyncCalls(
      {mobile_number, code},
      verifyMobile,
    );
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      onSubmit(details);
    }
  };
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''} ${
      seconds ? `${seconds} second${seconds > 1 ? 's' : ''}` : ''
    }`;
  };

  const onSubmit = async credentials => {
    console.log(credentials);
    const response = await performAsyncCalls(credentials, action);
    console.log(response);
    if (response && response.success) {
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      dispatch(updateCredentials({user: response.data}));
      navigate('Profile');
    } else {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    }
  };
  return (
    <Container style={{justifyContent: 'space-between'}}>
      <Header text={'Verify Opt'} />
      <Container
        style={{
          justifyContent: 'flex-start',
          // paddingHorizontal: mx3,
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
            <Text variant={'bold'} fontSize={RFValue(28)} color="success">
              Phone Verification
            </Text>
            <Text
              textAlign={'center'}
              marginVertical={'my1'}
              variant={'medium'}
              color={'muted'}>
              An authentication code has been sent to{' '}
              {`(+${details.code}) ${details.mobile_number}`}
            </Text>
          </Box>

          <OtpInputs
            handleChange={code => setCode(code)}
            numberOfInputs={6}
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
            isloading={verifyLoading || signupLoading || pinLoading}
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

export default VerifyPin;

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
