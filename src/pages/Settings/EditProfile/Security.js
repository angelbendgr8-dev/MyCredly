import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import _ from 'lodash';
import Text from '../../../Components/Text';
import Container from '../../../Components/Container';
import {AccountItem} from '../../Account';
import Box from '../../../Components/Box';
import {useNavigation} from '@react-navigation/native';

const Security = () => {
  const {navigate} = useNavigation();
  const [auth2fa, setAuth2fa] = useState(false);
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
          <AccountItem
            pressed={() => navigate('CreatePin')}
            text="Create Transaction Pin"
            hasRightIcon={true}
          />
          <AccountItem
            text="2FA Authentication"
            enable2fa={auth2fa}
            toggleRadio={setAuth2fa}
            hasRadio={true}
          />
        </Box>
      </ScrollView>
    </Container>
  );
};

export default Security;
