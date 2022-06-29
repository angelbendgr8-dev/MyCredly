import {StyleSheet} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import {PeerToPeer} from './PeerToPeer/Tabs/PeerToPeer';
import Text from '../Components/Text';

const BuyAndSell = () => {
  return (
    <Container paddingTop="my7">
      {/* <Header leftIcon={'true'} text={''} /> */}
      <Text variant={'bold'} marginLeft="m" marginTop={'l'}>
        P2P
      </Text>
      <PeerToPeer />
    </Container>
  );
};

export default BuyAndSell;

const styles = StyleSheet.create({});
