import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Box from '../../Components/Box';
import {ScrollView} from 'react-native';
import Text from '../../Components/Text';
import Select from '../../Components/Select';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStack} from '../../utils/ParamList';
import {useNavigation} from '@react-navigation/native';

const data = [
  {label: 'BTC', value: 'BTC'},
  {label: 'ETH', value: 'ETH'},
  {label: 'CELO', value: 'CELO'},
  {label: 'XRP', value: 'XRP'},
  {label: 'XLM', value: 'XLM'},
];
const type = [
  {label: 'Price', value: 'Price'},
  {label: 'Percentage', value: 'Percentage'},
];
const movement = [
  {label: 'Above', value: 'Above'},
  {label: 'Below', value: 'Below'},
];

const AddCryptoAlert = () => {
  const {goBack} =
    useNavigation<NativeStackNavigationProp<MainStack, 'AddCryptoAlert'>>();
  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingLeft="m" marginVertical={'m'}>
        <Text variant={'bold'} fontSize={20}>
          Add New Alert
        </Text>
      </Box>
      <Box
        marginHorizontal={'mx3'}
        paddingVertical={'my3'}
        paddingHorizontal={'mx3'}
        borderRadius={15}
        backgroundColor={'secondary'}>
        <ScrollView>
          <Box>
            <Text variant={'regular'} fontSize={14}>
              Coin Type
            </Text>
            <Select data={data} />
          </Box>
          <Box>
            <Text variant={'regular'} fontSize={14}>
              Alert Type
            </Text>
            <Select data={type} />
          </Box>
          <Box>
            <Text variant={'regular'} fontSize={14}>
              Movement
            </Text>
            <Select data={movement} />
          </Box>

          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              fontSize={13}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Price ($)
            </Text>
            <Input
              leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
              value={''}
              type={'none'}
              customStyles={{
                margin: 0,
                borderRadius: 30,
                height: heightPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}
              placeholder={' Enter Phone Number'}
              onChange={input => console.log(input)}
            />
          </Box>
          <Box
            // backgroundColor={'danger'}
            justifyContent={'space-around'}
            width={'100%'}
            flexDirection={'row'}>
            <Button
              label="Continue"
              onPress={goBack}
              backgroundColor={'success1'}
              width={widthPercentageToDP('85%')}
              labelStyle={{color: 'white'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
            />
          </Box>
        </ScrollView>
      </Box>
    </Container>
  );
};

export default AddCryptoAlert;
