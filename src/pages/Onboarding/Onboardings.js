import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import Onboard2 from './Onboard2';
import Onboard3 from './Onboard3';
import Welcome from './Welcome';

const Onboardings = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <Welcome />
      </View>
      <View key="2">
        <Onboard2 />
      </View>
      <View key="3">
        <Onboard3 />
      </View>
    </PagerView>
  );
};

export default Onboardings;
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
