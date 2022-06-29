import {Platform, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  LayoutProps,
  layout,
  BackgroundColorProps,
  composeRestyleFunctions,
} from '@shopify/restyle';
import {Theme} from '../theme';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  backgroundColor,
]);
type Props = RestyleProps & {
  style?: {};
  onPress?: () => void;
};
const Clickable: React.FC<Props> = ({children, style, onPress, ...rest}) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View {...props}>{children}</View>
    </TouchableOpacity>
  );
};

export default Clickable;
