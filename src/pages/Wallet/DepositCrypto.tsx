import {StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Container from '../../Components/Container';
import Text from '../../Components/Text';
import Header from '../../Components/Header';
import Box from '../../Components/Box';
import QRCode from 'react-native-qrcode-svg';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@shopify/restyle';
import  {useClipboard} from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import Clickable from '../../Components/Clickable';

const DepositCtypto = () => {
  const {params} = useRoute();
  const {item} = params;
  const theme = useTheme();
  const {muted} = theme.colors;
  const [data, setText] = useClipboard();
  const toast = useToast();

  const copyToClipboard = () => {
    setText(`${item.wType.name}: ${item.address}`);
    toast.show('address Copied', {
      type: 'success',
      placement: 'top',
      duration: 4000,
      animationType: 'zoom-in',
    });
  };
  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingTop={'my2'} paddingHorizontal={'mx3'}>
        <Text
          variant="medium"
          paddingVertical={'s'}
          fontSize={28}
          textTransform={'capitalize'}>
          Deposit {item.wType.name}
        </Text>
        <Box
          alignItems="center"
          alignSelf={'center'}
          width={widthPercentageToDP('70%')}
          marginVertical="my3"
          justifyContent={'center'}>
          <QRCode
            size={widthPercentageToDP('40%')}
            value={`${item.wType.name}: ${item.address}`}
          />
          <Text
            variant={'regular'}
            textAlign="center"
            color={'muted'}
            fontSize={16}>
            send only {item.name} to this address. This address doesn't support
            non-fungible token
          </Text>
        </Box>
        <Box
          flexDirection={'row'}
          alignItems="center"
          justifyContent={'space-between'}>
          <Box width={widthPercentageToDP('70%')}>
            <Text variant={'medium'} color="muted" fontSize={16}>
              Wallet Address
            </Text>
            <Text variant={'regular'} fontSize={18}>
              {item.address}
            </Text>
          </Box>
          <Clickable
            onPress={() => copyToClipboard()}
            backgroundColor={'secondary'}
            borderRadius={5}
            padding="s">
            <Icon name="copy" size={20} color={muted} />
          </Clickable>
        </Box>
        <Box
          flexDirection={'row'}
          alignItems="center"
          marginTop={'my2'}
          justifyContent={'space-between'}>
          <Box width={widthPercentageToDP('70%')}>
            <Text variant={'medium'} color="muted" fontSize={16}>
              Network
            </Text>
            <Text
              variant={'regular'}
              textTransform={'capitalize'}
              fontSize={18}>
              {item.wType.name} Network
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default DepositCtypto;

const styles = StyleSheet.create({});
