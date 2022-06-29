import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextCustom} from '../Components/Text';

const hide = () => {
  Toast.hide();
};

const ToastConfig = {
  // success: ({text2, ...rest}) => (
  //   <BaseToast
  //     {...rest}
  //     style={{borderLeftColor: 'green'}}
  //     contentContainerStyle={{paddingHorizontal: 15}}
  //     text2Style={{
  //       fontSize: 15,
  //     }}
  //     text2={text2}
  //     onTrailingIconPress={hide}
  //   />
  // ),
  success: ({text2, ...rest}) => (
    <BaseToast
      style={{
        height: 50,
        width: widthPercentageToDP('78%'),
        backgroundColor: '#1F1F1F',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        paddingLeft: 10,
      }}
      text2Style={{fontSize: 15, color: 'white'}}
      text2={text2}
      onPress={hide}
    />
  ),
  error: ({text2, ...rest}) => (
    <BaseToast
      style={{
        height: 50,
        width: widthPercentageToDP('78%'),
        backgroundColor: '#1F1F1F',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        paddingLeft: 10,
      }}
      text2Style={{fontSize: 15, color: 'white'}}
      text2={text2}
      onPress={hide}
    />
  ),

  success1: ({text2, props}) => (
    <View
      style={{
        height: 50,
        width: '90%',
        backgroundColor: '#1F1F1F',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 8,
      }}>
      <View
        style={{
          backgroundColor: 'green',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          padding: 3,
          height: 20,
          width: 20,
        }}>
        <Icon name={'check'} color="white" size={16} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 5,
          marginLeft: 8,
        }}>
        <TextCustom p medium>
          {text2}
        </TextCustom>
      </View>
      <TouchableOpacity
        onPress={hide}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          marginRight: 8,
        }}>
        <Icon color="white" name="closecircleo" size={16} />
      </TouchableOpacity>
    </View>
  ),
  error1: ({text2, props}) => (
    <View
      style={{
        height: 60,
        width: '90%',
        backgroundColor: '#1F1F1F',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        borderRadius: 8,
      }}>
      <View
        style={{
          backgroundColor: 'red',
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          padding: 3,
          height: 20,
          width: 20,
        }}>
        <Icon name={'warning'} color="white" size={14} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          flex: 5,
          marginLeft: 8,
        }}>
        <TextCustom p medium>
          {text2}
        </TextCustom>
      </View>
      <TouchableOpacity
        onPress={hide}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          marginRight: 8,
        }}>
        <Icon color="white" name="closecircleo" size={16} />
      </TouchableOpacity>
    </View>
  ),
};

export default ToastConfig;
