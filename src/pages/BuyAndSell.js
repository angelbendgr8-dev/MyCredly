import {StyleSheet} from 'react-native';
import React from 'react';
import Container from '../Components/Container';
import {PeerToPeer} from './PeerToPeer/Tabs/PeerToPeer';
import Text from '../Components/Text';
import Button from '../Components/Button';
import Box from '../Components/Box';
import {useTheme} from '@shopify/restyle';
import {useNavigation} from '@react-navigation/native';

const BuyAndSell = () => {
  const theme = useTheme();
  const {navigate} = useNavigation();
  const {success1} = theme.colors;
  return (
    <Container paddingTop="my4">
      {/* <Header leftIcon={'true'} text={''} /> */}
      <Box
        flexDirection={'row'}
        justifyContent="space-between"
        marginHorizontal="m"
        alignItems={'center'}>
        <Text variant={'bold'} fontSize={34}>
          P2P
        </Text>
        <Button
          label="Create Listing"
          onPress={() => navigate('CreateListing')}
          backgroundColor={'transparent'}
          labelStyle={{color: success1, fontWeight: '200', fontSize: 13}}
          padding={'my1'}
          borderRadius={30}
          borderWidth={0.5}
          borderColor={'success1'}
          alignItems={'center'}
        />
      </Box>
      <PeerToPeer />
    </Container>
  );
};

export default BuyAndSell;

const styles = StyleSheet.create({});
