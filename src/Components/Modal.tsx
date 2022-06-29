import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {createBox} from '@shopify/restyle';
import Modal from 'react-native-modal';
import {AppContext} from '../state/AppContext';
import Text from './Text';
import Button from './Button';
const Box = createBox();
type Props = {
  primaryText: string;
  secondaryText: string;
  onConfirmed: () => void;
  onCancelled: () => void;
};
const ModalContainer: React.FC<Props> = ({
  primaryText,
  secondaryText,
  onConfirmed,
  onCancelled,
}: Props) => {
  const {showModal} = useContext(AppContext);
  return (
    <Box>
      <Modal isVisible={showModal}>
        <Box
          backgroundColor={'secondary'}
          paddingTop={'my3'}
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'center'}>
          <Text variant={'medium'} color={'success1'}>
            {primaryText}
          </Text>
          <Box width={'75%'} alignItems={'center'}>
            <Text
              variant={'regular'}
              marginVertical={'my2'}
              textAlign={'center'}
              color={'foreground'}>
              {secondaryText}
            </Text>
          </Box>
          <Box
            // backgroundColor={'danger'}
            justifyContent={'space-around'}
            width={'100%'}
            flexDirection={'row'}>
            <Button
              label="Cancel"
              onPress={onCancelled}
              //   backgroundColor={'pink'}
              flex={1}
              width={100}
              labelStyle={{color: 'white'}}
              paddingVertical={'my1'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
              style={{backgroundColor: 'rgba(247,59,113,0.2)'}}
            />
            <Button
              label="Sure"
              onPress={onConfirmed}
              backgroundColor={'success1'}
              width={100}
              labelStyle={{color: 'white'}}
              paddingVertical={'my1'}
              marginVertical={'my3'}
              borderRadius={30}
              alignItems={'center'}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalContainer;

const styles = StyleSheet.create({});
