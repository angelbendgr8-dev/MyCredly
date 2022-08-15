import {StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../../Components/Container';
import Header from '../../../Components/Header';
import Text from '../../../Components/Text';
import {ProfileTab} from './ProfileTab';

const Profile = () => {
  return (
    <Container style={{paddingTop: 0}}>
      <Header leftIcon={true} text={''} />
      <Text variant={'bold'} color="muted" marginLeft="m" marginTop={'s'}>
        Edit Profile
      </Text>
      <ProfileTab />
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
