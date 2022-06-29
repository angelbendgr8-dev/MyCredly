import {} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../Components/Container';
import _ from 'lodash';
import Text from '../../../../Components/Text';

const Virtual = () => {
  const [banks, setBanks] = useState([]);
  return (
    <Container>
      {_.isEmpty(banks) ? (
        <Text variant={'medium'}>You have no Banks added to your account</Text>
      ) : (
        <Text variant={'medium'}>Bank Lists</Text>
      )}
    </Container>
  );
};

export default Virtual;
