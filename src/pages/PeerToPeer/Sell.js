import {ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {createBox, useTheme} from '@shopify/restyle';
import Select from '../../Components/Select';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import {AppContext} from '../../state/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../Components/Text';
import ModalContainer from '../../Components/Modal';
import Clickable from '../../Components/Clickable';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import CategoryList from './CategoryList';
import Filter from '../../Components/FilterModal';
const Box = createBox();
const data = [
  {label: 'BTC', value: 'BTC'},
  {label: 'ETH', value: 'ETH'},
];

const Sell = () => {
  const {setShowFilter} = useContext(AppContext);
  const theme = useTheme();
  const {success1, secondary, foreground} = theme.colors;

  const confirm = () => {
    setShowFilter(false);
  };
  const cancel = () => {
    setShowFilter(false);
  };
  const optionsStyles = {
    optionsContainer: {
      backgroundColor: secondary,
      width: widthPercentageToDP('35%'),
      padding: 5,
    },
    optionTouchable: {
      underlayColor: 'gold',
      activeOpacity: 70,
    },
    optionText: {
      color: 'brown',
    },
  };
  const optionStyles = {
    optionTouchable: {
      underlayColor: secondary,
      activeOpacity: 40,
    },
    optionWrapper: {
      backgroundColor: secondary,
      margin: 5,
    },
    optionText: {
      color: foreground,
    },
  };
  return (
    <Box flex={1} backgroundColor={'background'}>
      <Filter
        primaryText={'Filter'}
        onCancelled={cancel}
        onConfirmed={confirm}
        secondaryText={''}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          marginHorizontal={'mx3'}
          paddingVertical={'my3'}
          paddingHorizontal={'mx3'}
          borderRadius={15}
          backgroundColor={'secondary'}>
          <CategoryList />
          <Box>
            <Text variant={'regular'} color="muted" marginLeft="mx3">
              Amount
            </Text>
            <Box flexDirection={'row'} justifyContent="center">
              <Box width={widthPercentageToDP('85%')}>
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
          <Box alignItems={'center'}>
            <Button
              label="Submit"
              onPress={() => setShowFilter(true)}
              backgroundColor={'transparent'}
              width={widthPercentageToDP('85%')}
              labelStyle={{color: success1, fontWeight: '400'}}
              paddingVertical={'my2'}
              marginVertical={'my3'}
              borderRadius={30}
              borderWidth={0.5}
              borderColor={'success1'}
              alignItems={'center'}
            />
          </Box>
          <Box borderBottomWidth={1} borderBottomColor={'muted'} />
          <Box flexDirection={'row'} justifyContent="space-between">
            <Box width={widthPercentageToDP('45%')}>
              <Select data={data} />
            </Box>
            <Box
              flexDirection={'row'}
              justifyContent="flex-end"
              alignItems="center"
              width={widthPercentageToDP('40%')}>
              <Clickable
                marginHorizontal={'mx4'}
                onPress={() => setShowFilter(true)}>
                <Icon name="filter" color="white" size={20} />
              </Clickable>
              <Menu>
                <MenuTrigger>
                  <Icon
                    name="ellipsis-vertical-sharp"
                    color="white"
                    size={20}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => {}}
                    text="Trade History"
                  />
                  <MenuOption
                    customStyles={optionStyles}
                    onSelect={() => {}}
                    text="Create Listing"
                  />
                </MenuOptions>
              </Menu>
            </Box>
          </Box>
        </Box>
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
              onPress={() => setShowFilter(true)}
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
    </Box>
  );
};

export default Sell;
