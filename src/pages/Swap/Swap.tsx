import {ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import {createBox, useTheme} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';
import ModalContainer from '../../Components/Modal';
const Box = createBox();
const data = [
  {label: 'BTC', value: 'BTC'},
  {label: 'ETH', value: 'ETH'},
];

const Swap = () => {
  const {setShowModal} = useContext(AppContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const theme = useTheme();
  const {success} = theme.colors;

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
            <Text variant={'regular'}>You swap</Text>
            <Box flexDirection={'row'} justifyContent="space-between">
              <Box width={widthPercentageToDP('45%')}>
                <Select data={data} />
              </Box>
              <Box width={widthPercentageToDP('40%')}>
                <Input
                  leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
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
              </Box>
            </Box>
          </Box>
          <Box>
            <Text variant={'regular'}>Fund via</Text>
            <Box flexDirection={'row'} justifyContent="space-between">
              <Box width={widthPercentageToDP('45%')}>
                <Select data={data} />
              </Box>
              <Box width={widthPercentageToDP('40%')}>
                <Input
                  leftIcon={() => <Text variant={'regular'}>{'₦'}</Text>}
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
              </Box>
            </Box>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent="flex-start"
            alignItems={'center'}>
            <Icon name="infocirlceo" color="white" size={13} />
            <Text
              variant={'regular'}
              color="muted"
              fontSize={13}
              marginHorizontal={'mx4'}>
              Exchange Fees
            </Text>
            <Text variant={'regular'} fontSize={10}>
              0.15%
            </Text>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent="flex-start"
            marginVertical={'my2'}
            alignItems={'center'}>
            <Icon name="infocirlceo" color="white" size={13} />
            <Text
              variant={'regular'}
              color="muted"
              fontSize={13}
              marginHorizontal={'mx4'}>
              Estimated Arrival
            </Text>
            <Text variant={'regular'} fontSize={10}>
              Instant
            </Text>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent="flex-start"
            alignItems={'center'}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              tintColors={true ? success : 'white'}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <Text variant={'regular'} fontSize={12} marginHorizontal={'mx4'}>
              I Agree with terms of use, Privacy policy & AML/LYC
            </Text>
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

export default Swap;
