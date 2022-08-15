import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import Text from '../../../Components/Text';
import Container from '../../../Components/Container';
import {AccountItem} from '../../Account';
import Box from '../../../Components/Box';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../../state/hooks/userAuth';
import {useUpdate2faSecurityMutation} from '../../../state/services/SettingsService';
import {performAsyncCalls} from '../../../helpers/constants';
import {useToast} from 'react-native-toast-notifications';
import {updateCredentials} from '../../../state/reducers/userAuth';
import {useDispatch} from 'react-redux';

const Security = () => {
  const {navigate} = useNavigation();
  const toast = useToast();
  const {user} = useAuth();
  const [auth2fa, setAuth2fa] = useState(user.Auth2fa ? true : false);
  const [update2faSecurity, {isLoading}] = useUpdate2faSecurityMutation();
  const dispatch = useDispatch();

  const toggleSecurity = async () => {
    const response = await performAsyncCalls({}, update2faSecurity);
    console.log(response);
    if (response.success === false) {
      toast.show(response.message, {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
    } else {
      toast.show(response.message, {
        type: 'success',
        placement: 'top',
        duration: 4000,
        animationType: 'zoom-in',
      });
      dispatch(updateCredentials({user: response.data}));
      setAuth2fa(response.data.Auth2fa ? true : false);
    }
  };
  return (
    <Container>
      <ScrollView>
        <Box
          flex={1}
          marginHorizontal={'mx4'}
          marginVertical={'my4'}
          borderRadius={15}
          alignItems={'center'}
          paddingVertical={'my4'}
          paddingHorizontal={'mx3'}
          backgroundColor={'secondary'}>
          <AccountItem
            text="Change Password"
            pressed={() => navigate({name: 'ChangePassword'})}
            hasRightIcon={true}
          />

          {user.has_pin ? (
            <>
              <AccountItem
                pressed={() => navigate('CreatePin')}
                text="Reset Pin"
                hasRightIcon={true}
              />
              <AccountItem
                pressed={() => navigate('UpdatePin')}
                text="Update Pin"
                hasRightIcon={true}
              />
            </>
          ) : (
            <AccountItem
              pressed={() => navigate('CreatePin')}
              text="Create Transaction Pin"
              hasRightIcon={true}
            />
          )}
          <AccountItem
            text="2FA Authentication"
            enable2fa={auth2fa}
            isloading={isLoading}
            toggleRadio={toggleSecurity}
            hasRadio={true}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Security;
