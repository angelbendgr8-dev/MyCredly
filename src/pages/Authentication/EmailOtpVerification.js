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
import {useNavigation} from '@react-navigation/native';
import Links from '../../Components/Links';
import { RFValue } from 'react-native-responsive-fontsize';

const Box = createBox();
const EmailOtpVerification = () => {
  

  const {navigate} = useNavigation();
  const theme = useTheme();
  const {background, success} = theme.colors;
  const {my2, mx2,mx3, s} = theme.spacing;
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
            <Text variant={'bold'} fontSize={RFValue(28)} color="success">
              Email Verification
            </Text>
            <Text
              textAlign={'center'}
              marginVertical={'my1'}
              variant={'medium'}
              color={'faint'}>
              An authentication code has been sent to angl***@gmail.com
            </Text>
          </Box>

          <OtpInputs
            handleChange={code => console.log(code)}
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
            <Links onPress={() => navigate('Signup')} text={'Resend Code'} />
          </Box>
          <Button
            label="Verify Now"
            onPress={() => navigate('PhoneOtpVerification')}
            backgroundColor={'success'}
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
