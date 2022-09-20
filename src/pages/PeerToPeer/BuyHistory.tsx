import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../Components/Container';
import Header from '../../Components/Header';
import Text from '../../Components/Text';
import Select from '../../Components/Select';
import Box from '../../Components/Box';
import {useGetTradingHistoryQuery} from '../../state/services/transactions.services';
import _ from 'lodash';
import Clickable from '../../Components/Clickable';
import Right from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@shopify/restyle';
import {currencyFormat} from '../../helpers/constants';
import {color} from 'react-native-reanimated';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const TradeItem = ({item}: {item: any}) => {
  const theme = useTheme();
  const {muted} = theme.colors;
  const {navigate} = useNavigation();
  const type = item.listing.type;
  return (
    <Box backgroundColor={'secondary'} padding="mx4">
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        marginBottom={'my2'}>
        <Box flexDirection={'row'}>
          <Text
            variant={'medium'}
            color={type === 'buy' ? 'success1' : 'pink'}
            textTransform={'capitalize'}>
            {item.listing.type}
          </Text>
          <Text variant="medium"> {item.listing.asset}</Text>
        </Box>
        <Clickable
          flexDirection={'row'}
          onPress={() => navigate('TradingHistoryDetails', {item})}
          alignItems="center">
          <Text
            variant={'medium'}
            color="muted"
            textTransform={'capitalize'}
            paddingRight="mx2">
            {item.status}
          </Text>
          <Right name="angle-right" color={muted} size={16} />
        </Clickable>
      </Box>
      <Box>
        <Box flexDirection={'row'} marginVertical={'my1'}>
          <Text variant={'medium'} color={'muted'}>
            Price
          </Text>
          <Text variant={'medium'}>{currencyFormat(item.listing.price)}</Text>
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent="space-between"
          marginVertical={'my1'}>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color={'muted'}>
              Quantity
            </Text>
            <Text variant={'medium'}>
              {' '}
              {item.amount} {item.listing.asset}
            </Text>
          </Box>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color="muted" fontSize={14}>
              {moment(item.updated_at).format('MM-DD hh:mm:ss')}
            </Text>
          </Box>
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent="space-between"
          marginVertical={'my1'}>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color="muted">
              Order{' '}
            </Text>
            <Text variant={'medium'} color="muted">
              {item.trans_id}
            </Text>
          </Box>
          <Box flexDirection={'row'}>
            <Text variant={'medium'} color="muted">
              {currencyFormat(item.price)}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        backgroundColor={'faint'}
        alignItems={'flex-start'}
        padding="mx2"
        borderRadius={15}
        alignSelf="flex-start">
        <Text variant={'medium'} color="muted">
          Angelben
        </Text>
      </Box>
      <Box borderBottomWidth={0.5} marginTop="my2" borderBottomColor="muted" />
    </Box>
  );
};

const PeerHistory = ({type}: {type: string}) => {
  const filterData = [
    {label: 'Pending', value: 'pending'},
    {label: 'Cancelled', value: 'cancelled'},
    {label: 'In Dispute', value: 'In Dispute'},
    {label: 'Completed', value: 'Completed'},
  ];
  const {data: trading, isLoading} = useGetTradingHistoryQuery();
  const [mytrades, setMyTrades] = useState([]);

  const peerType = type;
  useEffect(() => {
    if (trading) {
      console.log(trading.data);
      let alltrades = [
        ...trading.data.mytrades,
        ...trading.data.othertrades,
      ].reverse();
      setMyTrades(alltrades);
    }
  }, [trading]);

  return (
    <Container>
      <Header leftIcon={true} />
      <Text variant={'bold'} fontSize={34} marginTop="my2">
        Trade History
      </Text>
      <Box
        backgroundColor={'secondary'}
        paddingHorizontal={'mx3'}
        marginVertical="my2">
        <Box width={'40%'}>
          <Select
            data={filterData}
            placeholder={'Filter Trade'}
            onSelect={data => console.log(data)}
          />
        </Box>
      </Box>
      <Box />
      {_.size(mytrades) > 0 ? (
        <FlatList
          data={mytrades}
          initialNumToRender={3}
          renderItem={({item}) => <TradeItem item={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Box>
          <Text variant={'medium'} color="muted">
            No Trading History
          </Text>
        </Box>
      )}
    </Container>
  );
};

export default PeerHistory;

const styles = StyleSheet.create({});
