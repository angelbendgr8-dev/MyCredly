import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {createBox, useTheme} from '@shopify/restyle';
import Input from '../../Components/Input';
import Text from '../../Components/Text';

import Icon from 'react-native-vector-icons/Entypo';

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

const Box = createBox();
const Register = () => {
  const [secure, setSecure] = React.useState(true);
  const [formattedValue, setFormattedValue] = useState('');
  const [agree, setAgree] = useState(false);
  const phoneInput = React.useRef();
  const {navigate} = useNavigation();
  const [phone, setPhone] = useState('');
  const theme = useTheme();
  const {background, success} = theme.colors;
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
          <Input
            label={'First Name'}
            value={''}
            type={'name'}
            placeholder={'First Name'}
            onChange={input => {}}
          />
          <Input
            label={'Last Name'}
            value={''}
            type={'name'}
            placeholder={'Last Name'}
            onChange={input => {}}
          />
          <Input
            label={'Username'}
            value={''}
            type={'nickname'}
            placeholder={'Username'}
            onChange={input => {}}
          />
          <Input
            label={'Email'}
            value={''}
            type={'emailAddress'}
            placeholder={'Email'}
            onChange={input => {}}
          />
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
            defaultCode="NG"
            layout="first"
            onChangeText={text => {
              setPhone(text);
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
            }}
            textContainerStyle={{borderRadius: 45, backgroundColor: background}}
            textInputStyle={{height: 40, marginTop: 1, color: 'white'}}
            codeTextStyle={{color: 'white'}}
          />
          <Input
            label={'Name'}
            value={''}
            type={'password'}
            placeholder={'Password'}
            onChange={input => {}}
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
          <Input
            label={'Referral'}
            value={''}
            type={'none'}
            placeholder={'Referral(Optional)'}
            onChange={input => {}}
          />
          <Box flexDirection={'row'} marginHorizontal={'my3'}>
            <CheckBox
              disabled={false}
              value={agree}
              tintColors={{true: success, false: 'white'}}
              onValueChange={newValue => setAgree(newValue)}
            />
            <Text variant={'medium'} fontSize={RFValue(14)}>
              By creating an account you agree to our Terms of Service and
              Privacy Policy
            </Text>
          </Box>
          <Button
            label="Sign Up"
            onPress={() => navigate('EmailOtpVerification')}
            backgroundColor={'success'}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
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
