import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import Container from '../../Components/Container';
import {createBox, useTheme} from '@shopify/restyle';
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

const Fund = () => {
  const theme = useTheme();
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
            <Select data={data}  />
          </Box>
          <Box textAlign={'left'}>
            <Text
              variant={'regular'}
              color={'foreground'}
              //   style={{color: foreground}}
              textAlign={'left'}>
              Amount
            </Text>
            <Input
              leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
              label={'Amount'}
              value={''}
              type={'none'}
              customStyles={{
                margin: 0,
                borderRadius: 30,
                height: heightPercentageToDP('6%'),
                marginVertical: heightPercentageToDP('2%'),
              }}
              placeholder={' Enter Amount'}
              onChange={input => console.log(input)}
            />
            <Box flexDirection={'row'}>
              <Text variant={'regular'} color={'muted'}>
                Transaction Fee
              </Text>
              <Text variant={'regular'} fontSize={14}>
                {' '}
                ₦ 200
              </Text>
            </Box>
          </Box>
          <Button
            label="Submit"
            onPress={() => setShowModal(true)}
            backgroundColor={'success1'}
            width={'100%'}
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

export default Fund;

const styles = StyleSheet.create({});
