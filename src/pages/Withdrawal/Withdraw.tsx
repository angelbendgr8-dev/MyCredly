import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {createBox} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';
import ModalContainer from '../../Components/Modal';
const Box = createBox();
const data = [{label: 'Bank  Transfer', value: 'Bank Transfer'}];

const Withdraw = () => {
  // const theme = useTheme();
  // const {foreground} = theme.colors;
  const {setShowModal} = useContext(AppContext);

  const confirm = () => {
    setShowModal(false);
  };
  const cancel = () => {
    setShowModal(false);
  };
  return (
    <Box flex={1} backgroundColor={'background'}>
      <ModalContainer
        primaryText={'Confirm Deposit'}
        onCancelled={cancel}
        onConfirmed={confirm}
        secondaryText={
          '3rd party payments will not be approved and will be refunded'
        }
      />
      <Box
        marginHorizontal={'mx3'}
        paddingVertical={'my3'}
        paddingHorizontal={'mx3'}
        borderRadius={15}
        backgroundColor={'secondary'}>
        <ScrollView>
          <Box>
            <Text variant={'regular'}>Fund via</Text>
            <Select data={data} disabled={false} />
          </Box>
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Amount
            </Text>
            <Input
              leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
              value={''}
              type={'none'}
              customStyles={{
                margin: 0,
                borderRadius: 30,
                height: heightPercentageToDP('6%'),
                marginTop: heightPercentageToDP('2%'),
              }}
              placeholder={' Enter Amount'}
              onChange={input => console.log(input)}
            />
            <Box flexDirection={'row'}>
              <Text variant={'regular'} color={'muted'}>
                Wallet Bal:
              </Text>
              <Text variant={'regular'} fontSize={14}>
                {' '}
                ₦ 0.00
              </Text>
            </Box>
          </Box>
          <Box marginTop={'my2'}>
            <Text variant={'regular'}>Select Bank</Text>
            <Select data={data} disabled={false} />
          </Box>
          <Box>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Account Number
            </Text>
            <Input
             
              value={''}
              type={'none'}
              customStyles={{
                margin: 0,
                borderRadius: 30,
                height: heightPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}
              placeholder={'Enter Account Number'}
              onChange={input => console.log(input)}
            />
          </Box>
          <Button
            label="Submit"
            onPress={() => setShowModal(true)}
            backgroundColor={'success1'}
            width={widthPercentageToDP('85%')}
            labelStyle={{color: 'white'}}
            paddingVertical={'my2'}
            marginVertical={'my3'}
            borderRadius={30}
            alignItems={'center'}
          />
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
