import {useTheme} from '@shopify/restyle';
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Text from '../Components/Text';
// import {News, Scores, Settings, Sports, Videos} from '../assets/global';
import Icon from 'react-native-vector-icons/Ionicons';
import Wallet from 'react-native-vector-icons/Fontisto';
import Swap from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BottomTabBar({state, descriptors, navigation}) {
  const theme = useTheme();
  const {secondary, success1} = theme.colors;
  return (
    <View
      style={{
        //   flex:1,
        flexDirection: 'row',
        alignItems: 'space-around',
        backgroundColor: '#252836',
        justifyContent: 'space-evenly',
        // paddingLeft: widthPercentageToDP('2%'),
        paddingVertical: 15,
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

        return (
          <TouchableOpacity
            accessibilityRole="button"
            key={index}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {label === 'Home' ? (
              <Icon
                name="home"
                size={isFocused ? 24 : 20}
                color={isFocused ? success1 : '#8A8D9F'}
                // style={{
                //   position:'absolute',
                //   bottom:0,
                //   borderRadius:120,
                //   backgroundColor: secondary,
                //   paddingHorizontal:15,
                //   paddingVertical:12,
                // }}
              />
            ) : label === 'Wallet' ? (
              <Icon
                name="wallet"
                size={isFocused ? 24 : 20}
                color={isFocused ? success1 : '#8A8D9F'}
              />
            ) : label === 'P2P' ? (
              <Swap
                name="stack-exchange"
                size={isFocused ? 24 : 20}
                color={isFocused ? success1 : '#8A8D9F'}
              />
            ) : label === 'Swap' ? (
              <Swap
                name="swap-horizontal-circle"
                size={isFocused ? 24 : 20}
                color={isFocused ? success1 : '#8A8D9F'}
              />
            ) : (
              <Icon
                name="settings"
                size={isFocused ? 24 : 20}
                color={isFocused ? success1 : '#8A8D9F'}
              />
            )}
            <Text
              variant={'regular'}
              fontSize={12}
              color={isFocused ? 'success1' : 'foreground'}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 40,
  },
});
