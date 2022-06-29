import {ScrollView} from 'react-native';
import React from 'react';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Box from '../../../Components/Box';
import Container from '../../../Components/Container';
import Header from '../../../Components/Header';
import Select from '../../../Components/Select';
import Text from '../../../Components/Text';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const data = [
  {label: "Voter's Card", value: "Voter's Card"},
  {label: 'National ID', value: 'National ID'},
  {label: "Driver's License", value: "Driver's License"},
  {label: 'International Passport', value: 'International Passport'},
  {label: 'NiMC Slip', value: 'NiMC Slip'},
];
const LevelTwo = () => {
  const {goBack} = useNavigation();
  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingLeft="m" marginVertical={'m'}>
        <Text variant={'bold'} fontSize={20}>
          Level 2 Verification
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
              ID Type
            </Text>
            <Select data={data} />
          </Box>
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Name on ID
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
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              ID Number
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
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Date Of Birth
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
              label="Back"
              onPress={goBack}
              //   backgroundColor={'pink'}
              flex={1}
              width={widthPercentageToDP('35%')}
              labelStyle={{color: 'white'}}
              paddingVertical={'my1'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
              backgroundColor="pink"
            />
            <Button
              label="Continue"
              onPress={goBack}
              backgroundColor={'success1'}
              width={widthPercentageToDP('35%')}
              labelStyle={{color: 'white'}}
              paddingVertical={'my1'}
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

export default LevelTwo;
