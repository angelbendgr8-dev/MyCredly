import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Clickable from '../../Components/Clickable';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStack} from '../../utils/ParamList';

const MobileMoney = () => {
  const [accounts] = useState([]);
  const {navigate} =
    useNavigation<NativeStackNavigationProp<MainStack, 'MobileMoney'>>();
  return (
    <Container>
      <Header leftIcon={true} />
      <Box
        flexDirection={'row'}
        alignItems={'center'}
        marginHorizontal="mx3"
        marginTop={'s'}
        justifyContent="space-between">
        <Text variant={'bold'} fontSize={26}>
          Mobile Money
        </Text>
        <Clickable
          onPress={() => navigate('AddMobileMoney')}
          flexDirection={'row'}
          alignItems="center">
          <Icon name={'plussquare'} color={'white'} size={14} />
          <Text variant={'regular'} marginLeft="s">
            {'Add Bank'}
          </Text>
        </Clickable>
      </Box>

      <Box flex={1}>
        {_.isEmpty(accounts) ? (
          <Box flex={1} justifyContent="center" alignItems={'center'}>
            <Text variant={'medium'}>
              You have no mobile account added to your account
            </Text>
          </Box>
        ) : (
          <Text variant={'medium'}>Bank Lists</Text>
        )}
      </Box>
    </Container>
  );
};

export default MobileMoney;
