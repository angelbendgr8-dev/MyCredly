import {} from 'react-native';
import React from 'react';
import Header from '../../../Components/Header';
import Container from '../../../Components/Container';
import Text from '../../../Components/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Box from '../../../Components/Box';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Button from '../../../Components/Button';
import {useNavigation} from '@react-navigation/native';

const AccountVerify = () => {
  const {navigate} = useNavigation();
  return (
    <Container>
      <Header leftIcon={true} />
      <Text variant={'bold'} marginLeft="m" marginTop={'s'}>
        Account Status
      </Text>
      <Box
        flexDirection={'row'}
        justifyContent="flex-start"
        paddingHorizontal="m"
        backgroundColor={'secondary'}
        paddingVertical={'l'}
        alignItems={'center'}>
        <Box>
          <Text variant={'regular'} color="foreground">
            Level 2
          </Text>
          <Text variant={'regular'} fontSize={12} color="light">
            ID Document
          </Text>
        </Box>
        <Box flex={2} marginLeft={'l'}>
          <Icon name="warning" size={26} color="red" />
        </Box>
      </Box>
      <Box
        justifyContent="flex-start"
        marginVertical="l"
        backgroundColor={'secondary'}
        paddingVertical={'m'}
        paddingLeft="m"
        alignItems={'flex-start'}>
        <Text variant={'bold'} fontSize={14} marginBottom="l" marginTop={'s'}>
          Requirement & Limit
        </Text>
        <Box>
          <Text variant={'regular'} fontSize={12} color="foreground">
            Account Limit
          </Text>
          <Text variant={'regular'} fontSize={13} color="light">
            $20,000/day
          </Text>
        </Box>
        <Box flex={2} marginLeft={'l'}>
          <Icon name="warning" size={26} color="red" />
        </Box>
        <Box
          width={widthPercentageToDP('87%')}
          paddingLeft="m"
          marginVertical={'l'}>
          <Box borderBottomColor={'light'} marginBottom={'l'} borderWidth={1} />
          <Box flexDirection={'row'}>
            <Icon name="checkmark-circle-outline" color={'white'} size={17} />
            <Text
              variant={'regular'}
              marginLeft={'m'}
              fontSize={13}
              color="light">
              Verified Id Upload
            </Text>
          </Box>
        </Box>
        <Button
          label="Verify"
          onPress={() => navigate('LevelTwo')}
          backgroundColor={'success1'}
          width={widthPercentageToDP('87%')}
          labelStyle={{color: 'white'}}
          paddingVertical={'my2'}
          marginVertical={'my3'}
          borderRadius={30}
          alignItems={'center'}
        />
      </Box>
    </Container>
  );
};

export default AccountVerify;
