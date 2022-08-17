import {StyleSheet} from 'react-native';
import React from 'react';
import Box from './Box';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
  testID?: string;
};
export const Loader: React.FC<Props> = ({visible, testID}) => {
  return (
    <Box>
      <Modal isVisible={visible} testID={testID}>
        <Box>
          <LottieView
            source={require('../assets/loader/loader.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
          {/* <Text variant="regular" textAlign="center">
            I am the modal content!
          </Text> */}
        </Box>
      </Modal>
    </Box>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: heightPercentageToDP('10%'),
    width: widthPercentageToDP('15%'),
    alignSelf: 'center',
  },
});
