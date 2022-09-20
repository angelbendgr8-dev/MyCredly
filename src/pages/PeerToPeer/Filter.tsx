import {} from 'react-native';
import React from 'react';
import Select from '../../Components/Select';
import Input from '../../Components/Input';
import Icon from 'react-native-vector-icons/Ionicons';
import Clickable from '../../Components/Clickable';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import CategoryList from './CategoryList';
import Box from '../../Components/Box';
import Text from '../../Components/Text';
import Button from '../../Components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useTheme} from '@shopify/restyle';
import {useNavigation} from '@react-navigation/native';
const filter = [
  {label: 'All listing', value: 'All'},
  {label: 'Other listing', value: 'Other'},
  {label: 'My listing', value: 'self'},
];

export default function ListingFilter({type}: {type: string}) {
  const theme = useTheme();
  const {success1, secondary, foreground} = theme.colors;
  const {navigate} = useNavigation();

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
          onPress={() => {}}
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
          <Select data={filter} />
        </Box>
        <Box
          flexDirection={'row'}
          justifyContent="flex-end"
          alignItems="center"
          width={widthPercentageToDP('40%')}>
          <Menu>
            <MenuTrigger>
              <Icon name="ellipsis-vertical-sharp" color="white" size={20} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                customStyles={optionStyles}
                onSelect={() => navigate('PeerHistory', {type})}
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
  );
}
