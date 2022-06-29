import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';
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

const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];

const AddMobileMoney = () => {
  const {goBack} =
    useNavigation<NativeStackNavigationProp<MainStack, 'AddMobileMoney'>>();
  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingLeft="m" marginVertical={'m'}>
        <Text variant={'bold'} fontSize={26}>
          Add Mobile Money
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
            <Text variant={'regular'}>Select Network Type</Text>
            <Select data={data} />
          </Box>
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Phone Number
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
          <Button
            label="Save"
            onPress={goBack}
            backgroundColor={'success1'}
            width={'100%'}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </ScrollView>
      </Box>
    </Container>
  );
};

export default AddMobileMoney;
