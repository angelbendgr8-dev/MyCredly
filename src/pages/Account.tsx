import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import Container from '../Components/Container';
import Box from '../Components/Box';
import Text from '../Components/Text';
import Icon from 'react-native-vector-icons/AntDesign';
import Verified from 'react-native-vector-icons/MaterialIcons';
import Alert from 'react-native-vector-icons/MaterialCommunityIcons';
import Gift from 'react-native-vector-icons/Ionicons';
import Clickable from '../Components/Clickable';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '@shopify/restyle';
import ToggleSwitch from 'toggle-switch-react-native';

type ItemProps = {
  text: string;
  hasRightIcon?: boolean;
  leftIcon?: Function;
  pressed?: () => void;
  toggleRadio?: (e: Event) => void;
  hasRadio?: boolean;
  enable2fa?: boolean;
};

const AccountCard = () => {
  const {navigate} = useNavigation();

  return (
    <Clickable
      onPress={() => navigate('Profile')}
      backgroundColor={'secondary'}
      justifyContent="space-between"
      alignItems={'center'}
      padding="m"
      borderRadius={15}
      flexDirection={'row'}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Image source={{}} style={styles.img} />
        <Box>
          <Text variant={'medium'} color="success1">
            Awoniyi Klama
          </Text>
          <Text variant={'regular'}>Level one</Text>
        </Box>
      </Box>
      <TouchableOpacity style={{padding: 2}}>
        <Icon name="right" color="white" size={18} />
      </TouchableOpacity>
    </Clickable>
  );
};

export const AccountItem: React.FC<ItemProps> = ({
  leftIcon,
  text,
  pressed,
  hasRightIcon = false,
  hasRadio = false,
  toggleRadio = () => {},
  enable2fa = false,
}) => {
  const {} = useNavigation();
  const theme = useTheme();
  const {success1, background} = theme.colors;

  return (
    <Clickable
      padding={'m'}
      onPress={pressed}
      flexDirection={'row'}
      width={widthPercentageToDP('94%')}
      justifyContent="space-between">
      <Box flexDirection={'row'} alignItems={'center'}>
        {leftIcon && leftIcon()}
        <Text variant={'regular'} marginLeft="m">
          {text}
        </Text>
      </Box>
      {hasRightIcon && (
        <TouchableOpacity style={{padding: 2}}>
          <Icon name="right" color="white" size={14} />
        </TouchableOpacity>
      )}
      {hasRadio && (
        <ToggleSwitch
          isOn={enable2fa}
          onColor={success1}
          offColor={background}
          trackOffStyle={{borderWidth: 1, borderColor: 'gray'}}
          size="medium"
          onToggle={isOn => toggleRadio(isOn)}
        />
      )}
    </Clickable>
  );
};

const Account = () => {
  const {navigate} = useNavigation();
  return (
    <Container>
      <Header text="Settings" />
      <Box marginHorizontal={'mx3'} marginVertical={'my2'}>
        <AccountCard />
        <Box backgroundColor={'secondary'} marginTop={'my2'} borderRadius={10}>
          <Box
            backgroundColor={'success1'}
            borderTopLeftRadius={10}
            borderTopRightRadius={10}
            paddingVertical={'my1'}>
            <Text variant={'medium'} color={'background'} textAlign={'center'}>
              Accounts
            </Text>
          </Box>
          <AccountItem
            leftIcon={() => (
              <Icon name="creditcard" color={'white'} size={16} />
            )}
            text="Banks and Cards"
            pressed={() => navigate('BankAndCards')}
            hasRightIcon={true}
          />
          <AccountItem
            leftIcon={() => <Alert name="phone" color={'white'} size={16} />}
            text="Mobile Money"
            hasRightIcon={true}
            pressed={() => navigate('MobileMoney')}
          />
          <AccountItem
            leftIcon={() => (
              <Verified name="verified" color={'white'} size={14} />
            )}
            text="Verification"
            hasRightIcon={true}
            pressed={() => navigate('AccountVerify')}
          />
          <AccountItem
            leftIcon={() => (
              <Alert name="bell-alert" color={'white'} size={16} />
            )}
            text="Crypto Price Alert"
            hasRightIcon={true}
            pressed={() => navigate('CryptoAlerts')}
          />
          <AccountItem
            leftIcon={() => <Gift name="md-gift" color={'white'} size={18} />}
            text="Claim Rewards"
            hasRightIcon={true}
          />
          <AccountItem
            leftIcon={() => (
              <Icon name="questioncircle" color={'white'} size={16} />
            )}
            text="Support"
            hasRightIcon={true}
          />
          <AccountItem
            leftIcon={() => <Icon name="logout" color={'white'} size={16} />}
            text="Logout"
            hasRightIcon={true}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Account;

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    borderRadius: 60,
    backgroundColor: 'red',
    marginRight: 5,
  },
});
