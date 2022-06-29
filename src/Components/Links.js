import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Text from './Text';

const Links = ({text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text variant={'medium'} fontSize={18} color={'success'}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Links;

const styles = StyleSheet.create({});
