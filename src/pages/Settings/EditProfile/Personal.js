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
          <Box marginBottom={'m'}>
            <ProfileImagge />
            <Text variant={'medium'}>John Doe</Text>
          </Box>

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
          <Input
            label={'Email'}
            value={''}
            type={'emailAddress'}
            placeholder={'Country'}
            onChange={input => {}}
          />

          <Input
            placeholder={'Phone Number'}
            value={''}
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
