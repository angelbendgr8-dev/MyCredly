import {Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import {assetUrl, currencyFormat} from '../../helpers/constants';
import {useGetConversionRateQuery} from '../../state/services/misc.services';

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

const CryptoWalletInfo: React.FC<Props> = () => {
  const {params} = useRoute();
  // console.log(params);
  const {item} = params;
  const [skip, setSkip] = useState(true);
  const {navigate} =useNavigation();
  const {data, isLoading} = useGetConversionRateQuery(
    {
      symbol: item.name,
      convert: 'USD',
      amount: item.balance,
    },
    {skip},
  );
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (item.balance > 0) {
      setSkip(false);
    }
  }, [data, isLoading, item]);

  useEffect(() => {}, [skip]);

  return (
    <Container>
      <Header leftIcon={true} />
      <Box paddingVertical={'mx3'} paddingHorizontal="mx3">
        {/* <Text variant={'medium'} marginVertical="my3" color="foreground">
          {item.label} Wallet
        </Text> */}
        <Box
          backgroundColor={'background'}
          // height={40}
          // width={40}
          alignItems="center"
          justifyContent={'center'}
          borderRadius={150}>
          <Image
            source={{uri: `${assetUrl()}${item.wType.icon}`}}
            style={{height: 60, width: 60, borderRadius:60}}
          />
          <Text variant={'regular'} textTransform={'capitalize'} fontSize={18}>
            {item.wType.name}
          </Text>
          <Text variant="regular" fontSize={18}>
            {item.balance.toFixed(5)} {item.name}
          </Text>
          <Text variant="regular" fontSize={18}>
            = {item.balance === 0 ? `$ ${item.balance.toFixed(2)}` : `$ ${0}`}
          </Text>
          <Box flexDirection={'row'} justifyContent="space-evenly">
            <Button
              label="Fund"
              onPress={() => navigate('DepositCrypto',{item})}
              backgroundColor={'success1'}
              width={widthPercentageToDP('40%')}
              labelStyle={{color: 'white', fontSize: 16, zIndex: 10}}
              paddingVertical={'my2'}
              borderWidth={0.5}
              borderColor="success"
              marginVertical={'my3'}
              opacity={0.8}
              marginRight="s"
              elevation={5}
              borderRadius={10}
              alignItems={'center'}
            />
            <Button
              label="Withdraw"
              onPress={() => navigate('WithdrawFund')}
              backgroundColor={'transparent'}
              width={widthPercentageToDP('40%')}
              // opacity={1}
              borderWidth={0.5}
              borderColor="foreground"
              labelStyle={{color: 'white', fontSize: 16}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              marginLeft="s"
              borderRadius={10}
              opacity={0.8}
              elevation={5}
              alignItems={'center'}
            />
          </Box>
        </Box>
        {/* <HeaderCard item={item} /> */}
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

export default CryptoWalletInfo;
