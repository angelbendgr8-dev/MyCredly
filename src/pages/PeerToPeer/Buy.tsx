import {FlatList, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createBox, useTheme} from '@shopify/restyle';
import Button from '../../Components/Button';
import {AppContext} from '../../state/AppContext';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';

import _ from 'lodash';
import Filter from '../../Components/FilterModal';
import {useNavigation} from '@react-navigation/native';
import {useGetListingsQuery} from '../../state/services/transactions.services';
import {useDispatch} from 'react-redux';
import {setListings} from '../../state/reducers/transactions.reducer';
import {useTransactions} from '../../state/hooks/transactions.hooks';
import ListingFilter from './Filter';
import ListingItem from './ListingItem';
const Box = createBox();

const Buy = () => {
  const {setShowFilter, category} = useContext(AppContext);
  const {data, isLoading} = useGetListingsQuery();
  const theme = useTheme();
  const {success1} = theme.colors;
  const [listing, setListing] = useState([]);

  const {buy} = useTransactions();

  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const confirm = () => {
    setShowFilter(false);
  };
  const cancel = () => {
    setShowFilter(false);
  };
  useEffect(() => {
    setListing(buy);
  }, [buy]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      dispatch(setListings({listings: data.data}));
    }
  }, [data]);

  useEffect(() => {
    const filteredListing = buy.filter(item => item.asset === category.label);
    setListing(filteredListing);
  }, [category]);

  return (
    <Box flex={1} backgroundColor={'background'}>
      <Filter
        primaryText={'Filter'}
        onCancelled={cancel}
        onConfirmed={confirm}
        secondaryText={''}
      />

      {!_.isEmpty(listing) ? (
        <FlatList
          renderItem={({item}) => <ListingItem item={item} />}
          data={listing}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <ListingFilter />}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <ListingFilter />
          <Box
            marginVertical={'my3'}
            backgroundColor={'secondary'}
            alignItems="center"
            borderRadius={10}
            minHeight={heightPercentageToDP('25%')}
            justifyContent={'flex-end'}
            flex={1}
            marginHorizontal={'mx3'}>
            <Text variant={'regular'} fontSize={14} color={'muted'}>
              No Listing Founds
            </Text>
            <Box alignItems={'center'}>
              <Button
                label="Create Listing"
                onPress={() => navigate('CreateListing')}
                backgroundColor={'transparent'}
                width={widthPercentageToDP('45%')}
                labelStyle={{color: success1, fontSize: 14}}
                paddingVertical={'my2'}
                marginVertical={'my3'}
                borderRadius={30}
                borderWidth={0.5}
                borderColor={'success1'}
                alignItems={'center'}
              />
            </Box>
          </Box>
        </ScrollView>
      )}
    </Box>
  );
};

export default Buy;
