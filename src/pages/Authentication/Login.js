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

const Box = createBox();
const Login = () => {
  const [secure, setSecure] = React.useState(true);
  const [loading, setLoading] = useState(false);

  const {navigate} = useNavigation();
  const theme = useTheme();
  const {success, foreground} = theme.colors;
  const {my2, mx3, s} = theme.spacing;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('Dashboard');
    }, 3000);
  };
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
          <Text variant={'bold'} color={'success'}>
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
          <Input
            label={'Email'}
            value={email}
            type={'emailAddress'}
            placeholder={'Email'}
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

          <Input
            label={'Name'}
            value={password}
            type={'password'}
            placeholder={'Password'}
            secure={secure}
            onChange={input => setPassword(input)}
            rightBtn={() => (
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Icon
                  name={secure ? 'eye' : 'eye-with-line'}
                  color={'white'}
                  size={14}
                />
              </TouchableOpacity>
            )}
            leftIcon={() => (
              <Icon
                style={{marginRight: s}}
                name={'lock'}
                size={18}
                color={success}
              />
            )}
          />

          <Box marginRight={'mx3'} alignSelf={'flex-end'}>
            <Links
              onPress={() => navigate('ForgotPassword')}
              text={'Forgot Password?'}
            />
          </Box>
          <Button
            label="Login"
            onPress={submit}
            backgroundColor={'success'}
            isloading={loading}
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
