import {Platform} from 'react-native';
import React from 'react';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
  createBox,
} from '@shopify/restyle';
import {Theme} from '../theme';

const Box = createBox();
type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;
const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);
type Props = RestyleProps & {};
const Container: React.FC<Props> = ({children, ...rest}) => {
  const props = useRestyle(restyleFunctions, rest);
  return (
    <Box
      {...props}
      flex={1}
      backgroundColor="background"
      paddingTop={Platform.OS === 'android' ? 's' : 'm'}>
      {children}
    </Box>
  );
};

export default Container;
