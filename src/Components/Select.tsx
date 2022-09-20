import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {createBox, useTheme} from '@shopify/restyle';
import {Dropdown} from 'react-native-element-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Text from './Text';
const Box = createBox();

type Props = {
  data: Array<{}>;
  disabled?: boolean;
  onSelect?: (value: number) => void;
  placeholder: string;
};
const Select: React.FC<Props> = ({
  data,
  disabled = false,
  onSelect = () => {},
  placeholder,
}) => {
  const [value, setValue] = useState('Bank Transfer');
  // console.log(data);
  const theme = useTheme();
  const {background, muted} = theme.colors;
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text variant={'medium'}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Box marginVertical={'m'}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, {backgroundColor: background}]}
        placeholderStyle={[styles.placeholderStyle, {color: muted}]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          {color: disabled ? muted : 'white'},
        ]}
        containerStyle={[
          {backgroundColor: background, borderWidth: 0, borderRadius: 10},
        ]}
        data={data}
        maxHeight={300}
        width={200}
        disable={disabled}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        activeColor={background}
        value={value}
        onChange={item => {
          setValue(item.value);
          onSelect(item.value);
        }}
        renderItem={renderItem}
      />
    </Box>
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdown: {
    height: heightPercentageToDP('6%'),
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    width: '100%',
    color: 'white',
    // backgroundColor: 'red',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0,
  },
});
