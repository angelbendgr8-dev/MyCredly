import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Text from '../../Components/Text';

type Props = {
  active: boolean;
  title: string;
  onPress: () => void;
};
export const Category: React.FC<Props> = ({active, title, onPress}) => {
  useEffect(() => {}, [title]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={active ? styles.underline : styles.noUnderline}>
      <Text
        variant={'bold'}
        fontSize={12}
        style={[
          styles.headerText,
          active ? styles.activeText : styles.nonActiveText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 13,
    lineHeight: 18,
    color: 'white',
    opacity: 0.87,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  activeText: {
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
    opacity: 0.87,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Medium',
  },
  nonActiveText: {
    color: '#707070',
  },
  underline: {
    backgroundColor: '#707070',
    padding: 5,
    opacity: 0.87,
    marginHorizontal: 10,
    borderRadius: 35,
  },
  noUnderline: {
    marginHorizontal: 10,
    justifyContent: 'center',
    padding: 5,
  },
});
