// import { NavigatorScreenParams } from '@react-navigation/native';

import {Item} from '../pages/Wallet/Fiats';

export type MainStack = {
  Onboard: undefined;
  Login: undefined;
  Signup: undefined;
  Welcome: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  FundWallet: undefined;
  WithdrawFund: undefined;
  Dashboard: undefined;
  BankAndCards: undefined;
  PhoneOtpVerification: undefined;
  Cards: undefined;
  Profile: undefined;
  ChangePassword: undefined;
  CreatePin: undefined;
  UpdatePin: undefined;
  VerifyPin: undefined;
  AccountVerify: undefined;
  LevelTwo: undefined;
  MobileMoney: undefined;
  AddMobileMoney: undefined;
  EmailOtpVerification: undefined;
  CryptoAlerts: undefined;
  AddCryptoAlert: undefined;
  WalletInfo: {
    item: Item;
  };
  CryptoWalletInfo: {
    item: Item;
  };
  DepositCrypto: {
    item: Item;
  };
};

export type BottomTabList = {
  Home: undefined;
  Wallet: undefined;
  P2P: undefined;
  Swap: undefined;
  Account: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStack {}
  }
}
