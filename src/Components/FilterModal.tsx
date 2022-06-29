import React, {useContext} from 'react';
import {createBox} from '@shopify/restyle';
import Modal from 'react-native-modal';
import {AppContext} from '../state/AppContext';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Clickable from './Clickable';
import Input from './Input';
import Select from './Select';
const Box = createBox();
type Props = {
  primaryText: string;
  secondaryText: string;
  onConfirmed: () => void;
  onCancelled: () => void;
};
const data = [
  {label: 'Mycredyly wallet', value: 'mycredyly'},
  {label: 'Bank Transfer', value: 'bank'},
];
const Filter: React.FC<Props> = ({
  primaryText,
  onConfirmed,
  onCancelled,
}: Props) => {
  const {showFilter} = useContext(AppContext);

  return (
    <Box>
      <Modal isVisible={showFilter}>
        <Box
          backgroundColor={'secondary'}
          paddingTop={'my1'}
          paddingBottom="my4"
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'center'}>
          <Box flexDirection="row" paddingHorizontal={'mx3'}>
            <Box flex={4} alignItems="center">
              <Text variant={'medium'} color={'foreground'}>
                {primaryText}
              </Text>
            </Box>
            <Box alignItems={'center'}>
              <Clickable onPress={onCancelled}>
                <Icon name={'close'} color="white" size={16} />
              </Clickable>
            </Box>
          </Box>
          <Box paddingTop={'my4'}>
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
          <Box width={widthPercentageToDP('85%')}>
            <Text variant={'regular'} color="muted" marginLeft="mx3">
              Coin Type
            </Text>
            <Select data={data} />
          </Box>
          <Box
            // backgroundColor={'danger'}
            justifyContent={'space-around'}
            width={'100%'}
            flexDirection={'row'}>
            <Box alignItems={'center'}>
              <Button
                label="Submit"
                onPress={onConfirmed}
                backgroundColor={'success1'}
                width={widthPercentageToDP('85%')}
                labelStyle={{color: 'white', fontWeight: '400'}}
                paddingVertical={'mx3'}
                marginVertical={'my3'}
                borderRadius={30}
                borderWidth={0.5}
                // borderColor={'success1'}
                alignItems={'center'}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Filter;
