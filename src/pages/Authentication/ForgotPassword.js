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
import {performAsyncCalls} from '../../helpers/constants';
import {useCheckEmailMutation} from '../../state/services/userAuth';
import {useToast} from 'react-native-toast-notifications';

const Box = createBox();
const ForgotPassword = () => {
  const [secure, setSecure] = React.useState(true);

  const {navigate} = useNavigation();
  const theme = useTheme();
  const {background, success, foreground} = theme.colors;
  const [email, setEmail] = useState('');
  const [checkEmail, {isLoading: emailCheckLoading}] = useCheckEmailMutation();
  const {my2, mx3, s} = theme.spacing;
  const toast = useToast();

  const validateEmail = async () => {
    if (email) {
      const response = await performAsyncCalls({email}, checkEmail);
      if (response.success === false) {
        const details = {email};
        navigate('EmailOtpVerification', {details, type: 'reset'});
      } else {
        toast.show('User with email not found', {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'zoom-in',
        });
      }
    }
  };

  return (
    <Container style={{justifyContent: 'space-between'}}>
      <Header text={'Sign In'} />
      <Container
        style={{
          justifyContent: 'flex-start',
          paddingHorizontal: mx3,
          paddingVertical: my2,
        }}>
        <Box
          marginHorizontal={'mx4'}
          marginVertical={'my2'}
          borderRadius={15}
          alignItems={'center'}
          alignSelf={'center'}
          paddingVertical={'my2'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <Box
            marginHorizontal={'s'}
            marginVertical={'my2'}
            maxWidth={widthPercentageToDP('55%')}>
            <Text textAlign={'center'} variant={'medium'} color={'muted'}>
              We will send a mail to the email address you registered to regain
              your password
            </Text>
          </Box>
          <Input
            label={'Email'}
            value={email}
            type={'emailAddress'}
            placeholder={'Email Address'}
            onChange={input => setEmail(input)}
            leftIcon={() => (
              <Icon
                style={{marginRight: s}}
                name={'mail'}
                size={18}
                color={success}
              />
            )}
          />

          <Box flexDirection={'row'} marginHorizontal={'my3'}>
            <Links variant={'medium'}>Forgot Password?</Links>
          </Box>
          <Button
            label="Send"
            onPress={() => validateEmail()}
            backgroundColor={'success'}
            width={widthPercentageToDP('80%')}
            childColor={foreground}
            isloading={emailCheckLoading}
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

export default ForgotPassword;

const styles = StyleSheet.create({});
