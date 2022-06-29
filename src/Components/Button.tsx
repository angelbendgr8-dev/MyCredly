import {TouchableOpacity, View} from 'react-native';
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
import React from 'react';

import Text from './Text';
import {Theme} from '../theme';
import Box from './Box';
import {Chase} from 'react-native-animated-spinkit';

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
  onPress: () => void;
  label: string;
  labelStyle: {};
  isloading?: boolean;
  childColor?: string;
};

const Button = ({
  onPress,
  label,
  labelStyle,
  childColor,
  isloading = false,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        {...props}>
        {isloading && (
          <Chase color={childColor} style={{marginRight: 5}} size={16} />
        )}
        <Text variant="medium" fontSize={20} style={labelStyle}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};
export default Button;
