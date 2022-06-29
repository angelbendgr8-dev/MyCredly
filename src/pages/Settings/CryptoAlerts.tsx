import {} from 'react-native';
import React, {useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import _ from 'lodash';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const CryptoAlerts = () => {
  const [alerts] = useState([]);
  const {navigate} = useNavigation();
  return (
    <Container>
      <Header leftIcon={true} />
      <Box
        alignItems={'flex-start'}
        marginHorizontal="mx3"
        marginTop={'s'}
        justifyContent="space-between">
        <Text variant={'bold'} fontSize={20}>
          Crypto Price Alert
        </Text>
        <Text variant={'regular'} fontSize={12}>
          Get notified when certain coin moves up or down in the market
        </Text>
      </Box>

      <Container justifyContent={'center'} alignItems={'center'}>
        {_.isEmpty(alerts) ? (
          <Text variant={'medium'}>no new alerts to display</Text>
        ) : (
          <Text variant={'medium'}>Bank Lists</Text>
        )}
      </Container>
      <Button
        label="Add new Alerts"
        onPress={() => navigate('AddCryptoAlert')}
        backgroundColor={'success1'}
        width={widthPercentageToDP('85%')}
        labelStyle={{color: 'white'}}
        paddingVertical={'my2'}
        marginVertical={'my3'}
        marginHorizontal={'my4'}
        borderRadius={30}
        alignItems={'center'}
      />
    </Container>
  );
};

export default CryptoAlerts;
