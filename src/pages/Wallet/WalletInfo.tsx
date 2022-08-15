import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import Box from '../../Components/Box';
import {useNavigation, useRoute} from '@react-navigation/native';
import Text from '../../Components/Text';
import Header from '../../Components/Header';
import Container from '../../Components/Container';
import {Item} from './Fiats';
import _ from 'lodash';

type Props = {
  item: Item;
};
const HeaderCard: React.FC<Props> = ({item}) => {
  const {navigate} = useNavigation();

  return (
    <Box
      backgroundColor={'success1'}
      overflow={'hidden'}
      paddingTop={'my2'}
      borderRadius={15}>
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={-70}
        top={-75}
      />
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        overflow={'visible'}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={-30}
        bottom={-95}
      />
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingHorizontal={'mx3'}>
        <Box>
          <Text variant={'regular'} color={'background'} fontSize={12}>
            Wallet Balance
          </Text>
          <Text variant={'bold'} color={'background'} fontSize={16}>
            {item.code} 0.00
          </Text>
        </Box>
      </Box>
      <Box flexDirection={'row'} justifyContent="space-evenly">
        <Button
          label="Fund"
          onPress={() => navigate('FundWallet')}
          backgroundColor={'faint'}
          width={widthPercentageToDP('40%')}
          labelStyle={{color: 'white', fontSize: 16, zIndex: 10}}
          paddingVertical={'my2'}
          marginVertical={'my3'}
          opacity={0.8}
          elevation={5}
          borderRadius={10}
          alignItems={'center'}
        />
        <Button
          label="Withdraw"
          onPress={() => navigate('WithdrawFund')}
          backgroundColor={'faint'}
          width={widthPercentageToDP('40%')}
          // opacity={1}
          labelStyle={{color: 'white', fontSize: 16}}
          paddingVertical={'my2'}
          marginVertical={'my3'}
          borderRadius={10}
          opacity={0.8}
          elevation={5}
          alignItems={'center'}
        />
      </Box>
    </Box>
  );
};

const WalletInfo: React.FC<Props> = () => {
  const {params} = useRoute();
  //   console.log(params);
  const {item} = params;
  const [transactions, setTransactions] = useState([]);

  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingVertical={'mx3'} paddingHorizontal="mx3">
        <Text variant={'medium'} marginVertical="my3" color="foreground">
          {item.label} Wallet
        </Text>
        <HeaderCard item={item} />
        <Text variant={'bold'} fontSize={20} color="foreground">
          Transactions
        </Text>
        {_.isEmpty(transactions) ? (
          <Box
            height={heightPercentageToDP('45%')}
            alignItems="center"
            justifyContent={'center'}
            flexDirection={'column'}>
            <Text variant={'regular'}>No transactions Recorded</Text>
          </Box>
        ) : (
          <Text variant={'medium'}>transactions here</Text>
        )}
      </Box>
    </Container>
  );
};

export default WalletInfo;
