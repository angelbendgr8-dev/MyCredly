import {StyleSheet, View} from 'react-native';
import React from 'react';
import Container from '../../Components/Container';
import Text from '../../Components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {createBox} from '@shopify/restyle';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useNavigation} from '@react-navigation/native';

const Box = createBox();
const Welcome = () => {
  const {navigate} = useNavigation();
  return (
    <Container style={styles.customStyle}>
      <Box />
      <Box
        height={heightPercentageToDP('50%')}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}>
        <LinearGradient
          colors={['#A7E05F', '#12AB97']}
          style={styles.linearGradient}>
          <Text variant={'bold'}>Welcome to MyCredly</Text>
          <Text variant={'regular'} style={styles.descriptionStyle}>
            Reference site about Lorem Ipsum, giving information origins as well
            as a random{' '}
          </Text>
          <Button
            label="Get Started"
            onPress={() => navigate('Signup')}
            backgroundColor={'foreground'}
            width={widthPercentageToDP('80%')}
            labelStyle={{color: 'black'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />

          <Box flexDirection={'row'} marginTop={'my4'}>
            <Box
              height={10}
              width={10}
              marginHorizontal={'s'}
              backgroundColor={'transparent'}
              borderRadius={60}
            />
            <Box
              height={10}
              width={10}
              marginHorizontal={'s'}
              backgroundColor={'foreground'}
              borderRadius={60}
            />
            <Box
              height={10}
              width={10}
              marginHorizontal={'s'}
              backgroundColor={'foreground'}
              borderRadius={60}
            />
          </Box>
        </LinearGradient>
      </Box>
    </Container>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  customStyle: {
    justifyContent: 'space-between',
  },

  linearGradient: {
    height: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
    paddingVertical: heightPercentageToDP('5%'),
  },
  descriptionStyle: {
    marginVertical: heightPercentageToDP('2%'),
    width: widthPercentageToDP('60%'),
    textAlign: 'center',
  },
});
