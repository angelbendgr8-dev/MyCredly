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
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const [secure, setSecure] = useState(true);
  const {goBack} = useNavigation();
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
          <Input
            value={''}
            type={'password'}
            placeholder={'Old Password'}
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
            value={''}
            type={'password'}
            placeholder={'Confirm Password'}
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
          <Button
            label="Save Now"
            onPress={goBack}
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
