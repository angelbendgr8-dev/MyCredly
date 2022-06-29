import {StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../../../../Components/Container';
import Header from '../../../../Components/Header';
import Text from '../../../../Components/Text';
import {CardTab} from './CardTab';

const Cards = () => {
  return (
    <Container style={{paddingTop: 0}}>
      <Header leftIcon={true} text={''} />
      <Text variant={'bold'} marginLeft="m" marginTop={'s'}>
        Cards
      </Text>
      <CardTab />
    </Container>
  );
};

export default Cards;

const styles = StyleSheet.create({});
