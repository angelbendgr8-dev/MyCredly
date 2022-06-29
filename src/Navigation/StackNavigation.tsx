// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Onboardings from '../pages/Onboarding/Onboardings';
import Register from '../pages/Authentication/Register';
import Login from '../pages/Authentication/Login';
import ForgotPassword from '../pages/Authentication/ForgotPassword';
import PhoneOtpVerification from '../pages/Authentication/PhoneOtpVerification';
import EmailOtpVerification from '../pages/Authentication/EmailOtpVerification';
import {BottomTab} from './BottomTab';
import FundWallet from '../pages/Wallet/FundWallet';
import WithdrawFund from '../pages/Withdrawal/WithdrawFund';
import BanksAndCard from '../pages/Settings/BanksAndCards/BanksAndCard';
import {MainStack} from '../utils/ParamList';
import Cards from '../pages/Settings/BanksAndCards/Cards/Cards';
import Profile from '../pages/Settings/EditProfile/Profile';
import ChangePassword from '../pages/Settings/EditProfile/ChangePassword';
import CreatePin from '../pages/Settings/EditProfile/CreatePin';
import MobileMoney from '../pages/Settings/MobileMoney';
import AddMobileMoney from '../pages/Settings/AddMobileMoney';
import AccountVerify from '../pages/Settings/Verification/AccountVerify';
import LevelTwo from '../pages/Settings/Verification/LevelTwo';
import CryptoAlerts from '../pages/Settings/CryptoAlerts';
import AddCryptoAlert from '../pages/Settings/AddCryptoAlert';
const Stack = createNativeStackNavigator<MainStack>();

function StackNavigation() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 3000);
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Dashboard'}>
      <Stack.Screen name="Onboard" component={Onboardings} />
      <Stack.Screen name="Signup" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={BottomTab} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="FundWallet" component={FundWallet} />
      <Stack.Screen name="WithdrawFund" component={WithdrawFund} />
      <Stack.Screen name="BankAndCards" component={BanksAndCard} />
      <Stack.Screen name="Cards" component={Cards} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="MobileMoney" component={MobileMoney} />
      <Stack.Screen name="AddMobileMoney" component={AddMobileMoney} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AccountVerify" component={AccountVerify} />
      <Stack.Screen name="LevelTwo" component={LevelTwo} />
      <Stack.Screen name="CryptoAlerts" component={CryptoAlerts} />
      <Stack.Screen name="AddCryptoAlert" component={AddCryptoAlert} />
      <Stack.Screen
        name="PhoneOtpVerification"
        component={PhoneOtpVerification}
      />
      <Stack.Screen
        name="EmailOtpVerification"
        component={EmailOtpVerification}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
