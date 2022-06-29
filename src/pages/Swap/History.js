import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {createBox} from '@shopify/restyle';
import _ from 'lodash';
import Text from '../../Components/Text';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const Box = createBox();

const History = () => {
  const [history, setHistory] = useState([]);
  return (
    <Box flex={1} backgroundColor={'background'}>
      <ScrollView>
        {_.isEmpty(history) ? (
          <Box
            justifyContent={'center'}
            flex={1}
            height={heightPercentageToDP('75%')}
            // backgroundColor="danger"
            alignItems="center">
            <Text variant={'medium'}>You have no swap history</Text>
          </Box>
        ) : (
          <Box>
            <Text variant={'medium'}> History</Text>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default History;

const styles = StyleSheet.create({});
