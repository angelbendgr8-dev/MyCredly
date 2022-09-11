import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Button from '../Components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Container from '../Components/Container';
import {createBox, useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../Components/Text';
import {Dropdown} from 'react-native-element-dropdown';
import moment from 'moment';
import {ghs, ngn, usa} from '../assets';
import {useAuth} from '../state/hooks/userAuth';
import {useGetWalletsQuery} from '../state/services/wallet.services';
import {useDispatch} from 'react-redux';
import {setWallets} from '../state/reducers/wallet.reducer';
import _ from 'lodash';
import {useWallet} from '../state/hooks/wallet.hooks';
import {assetUrl, currencyFormat} from '../helpers/constants';
import {AppContext} from '../state/AppContext';
const Box = createBox();
const data = [
  {label: 'NGN', value: 'NGN', icon: ngn, code: '₦'},
  {label: 'GHS', value: 'GHS', icon: ghs, code: '₵'},
  {label: 'USD', value: 'USD', icon: usa, code: '$'},
];
type FeatureProps = {
  text: string;
  icon: () => {};
};
function greeting() {
  const hour = moment().hour();

  if (hour > 16) {
    return 'Good evening,';
  }

  if (hour > 11) {
    return 'Good afternoon,';
  }

  return 'Good morning';
}
const HeaderBoard = () => {
  const {user} = useAuth();
  return (
    <Box flexDirection={'column'} paddingHorizontal="mx3">
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={-70}
        top={-95}
      />
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={20}
        top={-135}
      />
      <Box
        flexDirection={'row'}
        width={'100%'}
        alignItems="center"
        justifyContent={'space-between'}>
        <Icon name="user-circle-o" color="white" size={22} />

        <Icon name="bell-o" color="white" size={22} />
      </Box>
      <Box marginVertical={'my2'}>
        <Text
          variant={'medium'}
          color={'background'}
          textTransform={'capitalize'}>
          {greeting()}
        </Text>
        <Text
          variant={'medium'}
          color={'background'}
          textTransform={'capitalize'}>
          {user.first_name} {user.last_name}
        </Text>
      </Box>
    </Box>
  );
};

const HeaderCard = () => {
  const {navigate} = useNavigation();
  const [value, setValue] = useState('NGN');
  const {fiats} = useWallet();
  const theme = useTheme();
  const {background, faint} = theme.colors;
  const [balance, setBalance] = useState(0.0);
  const [code, setCode] = useState('₦');
  const [icon, setIcon] = useState('');
  const [selected, setSelected] = useState(fiats ? fiats[0] : []);
  // console.log(`${assetUrl()}${fiats[0].wType.icon}`);
  const {setCwallet} = useContext(AppContext);
  const renderItem = (item: any) => {
    console.log(item.wType.icon);
    return (
      <View style={styles.item}>
        <Image
          source={{uri: `${assetUrl()}${item.wType.icon}`}}
          style={styles.icon}
        />
        <Text variant={'medium'}>{item.name}</Text>
      </View>
    );
  };
  useEffect(() => {
    if (!_.isEmpty(fiats)) {
      setIcon(fiats[0].wType.icon);
      setCode(fiats[0].wType.sign);
      setBalance(fiats[0].balance);
      setSelected(fiats[0]);
    }
  }, [fiats]);

  return (
    <Box
      backgroundColor={'success1'}
      overflow={'hidden'}
      paddingTop={'my2'}
      borderRadius={15}>
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={-70}
        top={-75}
      />
      <Box
        backgroundColor={'foreground'}
        opacity={0.15}
        overflow={'visible'}
        height={heightPercentageToDP('25%')}
        width={heightPercentageToDP('25%')}
        borderRadius={120}
        position="absolute"
        right={-30}
        bottom={-95}
      />
      <Box
        flexDirection={'row'}
        justifyContent={'space-between'}
        paddingHorizontal={'mx3'}>
        <Box>
          <Text variant={'regular'} color={'background'} fontSize={12}>
            Wallet Balance
          </Text>
          <Text variant={'bold'} color={'background'} fontSize={16}>
            {currencyFormat(balance, code)}
          </Text>
        </Box>
        <Box>
          {/* {renderLabel()} */}
          <Dropdown
            style={[styles.dropdown, {backgroundColor: faint, opacity: 0.8}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            containerStyle={[
              {backgroundColor: faint, borderWidth: 0, opacity: 0.8},
            ]}
            data={_.size(fiats) > 0 ? fiats : []}
            maxHeight={300}
            width={200}
            labelField="name"
            valueField="name"
            activeColor={background}
            value={value}
            onChange={item => {
              setValue(item.name);
              setSelected(item);
              setIcon(item.wType.icon);
              setCode(item.wType.sign);
              setBalance(item.balance);
            }}
            renderLeftIcon={() => (
              <Image
                style={styles.icon}
                source={{uri: `${assetUrl()}${icon}`}}
              />
            )}
            renderItem={renderItem}
          />
        </Box>
      </Box>
      <Box flexDirection={'row'} justifyContent="space-evenly">
        <Button
          label="Fund"
          onPress={() => {
            setCwallet(value);
            navigate('WalletInfo', {item: selected});
          }}
          backgroundColor={'faint'}
          width={widthPercentageToDP('40%')}
          labelStyle={{color: 'white', fontSize: 16, zIndex: 10}}
          paddingVertical={'my2'}
          marginVertical={'my3'}
          opacity={0.8}
          elevation={5}
          borderRadius={10}
          alignItems={'center'}
        />
        <Button
          label="Withdraw"
          onPress={() => navigate('WithdrawFund')}
          backgroundColor={'faint'}
          width={widthPercentageToDP('40%')}
          // opacity={1}
          labelStyle={{color: 'white', fontSize: 16}}
          paddingVertical={'my2'}
          marginVertical={'my3'}
          borderRadius={10}
          opacity={0.8}
          elevation={5}
          alignItems={'center'}
        />
      </Box>
    </Box>
  );
};

const Feature: React.FC<FeatureProps> = ({text, icon}) => {
  return (
    <Box marginHorizontal={'mx1'} alignItems="center">
      <Box
        backgroundColor={'secondary'}
        borderRadius={10}
        // height={50}
        // width={widthPercentageToDP('20%')}
        padding="m"
        alignItems="center"
        justifyContent={'center'}
        elevation={5}>
        {icon()}
      </Box>
      <Box alignItems={'center'}>
        <Text variant={'regular'} fontSize={14}>
          {text}
        </Text>
      </Box>
    </Box>
  );
};

const Dashboard = () => {
  const {navigate} = useNavigation();
  const theme = useTheme();
  const {data: wallets, isLoading} = useGetWalletsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(wallets)) {
      // console.log(wallets);
      dispatch(setWallets({wallets: wallets.data}));
    }

    return () => {};
  }, [wallets, dispatch]);

  const {success1, progress, warning, pink} = theme.colors;

  return (
    <Container style={[styles.customStyle, {backgroundColor: success1}]}>
      <StatusBar barStyle="light-content" backgroundColor={success1} />
      <HeaderBoard />
      <Box
        flex={1}
        backgroundColor="background"
        paddingHorizontal={'mx3'}
        paddingTop={'my2'}
        borderTopLeftRadius={25}
        borderTopRightRadius={25}>
        <ScrollView>
          {_.size(wallets) > 0 && <HeaderCard />}

          <Box
            flexWrap={'wrap'}
            justifyContent={'space-around'}
            flexDirection={'row'}
            marginTop={'my2'}>
            <Feature
              text={'Buy'}
              icon={() => (
                <Icon2
                  name={'cart-arrow-down'}
                  style={{
                    backgroundColor: progress,
                    padding: 10,
                    borderRadius: 120,
                  }}
                  size={24}
                  color={'white'}
                />
              )}
            />
            <Feature
              text={'Sell'}
              icon={() => (
                <Icon2
                  name={'cart-arrow-up'}
                  style={{
                    backgroundColor: 'dodgerblue',
                    padding: 10,
                    borderRadius: 120,
                  }}
                  size={24}
                  color={'white'}
                />
              )}
            />
            <Feature
              text={'Airtime/data'}
              icon={() => (
                <Icon2
                  name={'card-account-phone'}
                  style={{
                    backgroundColor: warning,
                    padding: 10,
                    borderRadius: 120,
                  }}
                  size={24}
                  color={'white'}
                />
              )}
            />
            <Feature
              text={'Cards'}
              icon={() => (
                <Icon
                  name={'credit-card'}
                  style={{
                    backgroundColor: pink,
                    padding: 10,
                    borderRadius: 120,
                  }}
                  size={24}
                  color={'white'}
                />
              )}
            />
          </Box>
        </ScrollView>
      </Box>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  customStyle: {
    paddingTop:
      Platform.OS === 'ios'
        ? heightPercentageToDP('3%')
        : heightPercentageToDP('2%'),
  },
  dropdown: {
    height: 35,
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: widthPercentageToDP('25%'),
    color: 'white',
    backgroundColor: 'red',
  },
  icon: {
    marginRight: 5,
    height: 20,
    width: 20,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
  },
  iconStyle: {
    width: 10,
    height: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0,
  },
});
