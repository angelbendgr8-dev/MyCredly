import {Image, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import Container from '../../../Components/Container';
import Button from '../../../Components/Button';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Input from '../../../Components/Input';
import Box from '../../../Components/Box';
import Icon from 'react-native-vector-icons/AntDesign';
import Text from '../../../Components/Text';
import {useAuth} from '../../../state/hooks/userAuth';

export const ProfileImagge = ({image}) => {
  return (
    <Box justifyContent={'center'} alignSelf="center">
      {image ? (
        <Image src={{uri: image}} style={styles.image} />
      ) : (
        <Box style={styles.image}>
          <Icon name="user" size={24} color={'black'} />
        </Box>
      )}
    </Box>
  );
};

const Personal = () => {
  const {user} = useAuth();
  return (
    <Container>
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
          <Box marginBottom={'my3'}>
            <ProfileImagge />
            <Text variant={'medium'} marginTop={'my2'}>
              {user.first_name} {user.last_name}
            </Text>
          </Box>

          <Input
            label={'Username'}
            value={user.username}
            disabled={false}
            type={'nickname'}
            placeholder={'Username'}
            onChange={input => {}}
          />
          <Input
            label={'Email'}
            value={user.email}
            disabled={false}
            type={'emailAddress'}
            placeholder={'Email'}
            onChange={input => {}}
          />
          <Input
            label={'Email'}
            value={user.country}
            type={'none'}
            disabled={false}
            placeholder={'Country'}
            onChange={input => {}}
          />

          <Input
            placeholder={'Phone Number'}
            disabled={false}
            value={`+${user.code}${user.mobile_number}`}
            type={'none'}
            onChange={input => {}}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Personal;

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
