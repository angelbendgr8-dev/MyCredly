import {Platform, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  ShadowProps,
  shadow,
  LayoutProps,
  layout,
  BackgroundColorProps,
  composeRestyleFunctions,
} from '@shopify/restyle';
import {Theme} from '../theme';
import Box from './Box';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ShadowProps<Theme> &
  LayoutProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  layout,
  shadow,
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
      <Box {...props}>{children}</Box>
    </TouchableOpacity>
  );
};

export default Clickable;
