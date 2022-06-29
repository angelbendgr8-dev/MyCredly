import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  createBox,
  useTheme,
} from '@shopify/restyle';
import React from 'react';

import {Theme} from '../theme';
import {StyleSheet, TextInput, View} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const Box = createBox();

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

type Props = RestyleProps & {
  value: string;
  placeholder: string;
  onChange: (e: Event) => void;
  type: string;
  secure?: boolean;
  disabled?: boolean;
  blurred?: () => void;
  rightBtn?: Function;
  leftIcon?: Function;
  customStyles: {};
};

const Input = ({
  value,
  placeholder,
  onChange,
  type,
  secure = false,
  disabled = true,
  blurred,
  rightBtn,
  leftIcon,
  customStyles,
}: Props) => {
  const [holder, setHolder] = React.useState(placeholder);
  const [isFocus, setIsFocus] = React.useState(false);
  const theme = useTheme();
  const {foreground} = theme.colors;

  return (
    <Box
      backgroundColor={'background'}
      flexDirection={'row'}
      borderRadius={30}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingHorizontal={'mx3'}
      borderColor="success"
      borderWidth={isFocus ? 1 : 0}
      margin={'my1'}
      height={heightPercentageToDP('7%')}
      style={customStyles}
      width={'100%'}>
      {leftIcon && <View style={{}}>{leftIcon()}</View>}
      <TextInput
        value={value}
        placeholder={holder}
        placeholderTextColor={foreground}
        onChangeText={onChange}
        onFocus={() => {
          setIsFocus(true);
          setHolder('');
        }}
        onBlur={() => {
          setHolder(placeholder);
          setIsFocus(false);
          // blurred()
        }}
        onEndEditing={blurred}
        style={[
          styles.inputStyle,
          {
            flex: 2,
            color: foreground,
          },
          // props.style,
        ]}
        // multiline={props.line ? true : false}
        textContentType={type}
        secureTextEntry={secure}
        editable={disabled}
        underlineColorAndroid="transparent"
      />
      {rightBtn && <View style={{}}>{rightBtn()}</View>}
    </Box>
  );
};

export default Input;

const styles = StyleSheet.create({
  iconStyle: {
    // marginLeft:10,
    alignSelf: 'center',
  },
  inputStyle: {
    borderBottomWidth: 0,

    fontFamily: 'Roboto-Medium',
    // backgroundColor:'green',
  },
});
