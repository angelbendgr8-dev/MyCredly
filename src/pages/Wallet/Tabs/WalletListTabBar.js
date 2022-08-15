import {useTheme} from '@shopify/restyle';
import React from 'react';
import {Animated, View, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Text from '../../../Components/Text';

export function WalletListTabBar({state, descriptors, navigation, position}) {
  const theme = useTheme();
  const {secondary} = theme.colors;
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: widthPercentageToDP('4%'),
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? secondary : 'transparent',
              alignItems: 'center',
              borderRadius: 15,
              paddingVertical: heightPercentageToDP('2%'),
            }}>
            <Text variant={'regular'} style={[{color: 'white'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
