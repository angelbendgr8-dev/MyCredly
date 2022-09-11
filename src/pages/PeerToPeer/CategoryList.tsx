import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Category} from './Category';
import {AppContext} from '../../state/AppContext';
import {useGetWalletTypesQuery} from '../../state/services/misc.services';

const CategoryList = ({}) => {
  const {setCategory, category} = useContext(AppContext);
  const [categories, setCategories] = useState('All');
  const {data, isLoading} = useGetWalletTypesQuery();
  // console.log(categories);
  //   const {navigate} = useNavigation();
  useEffect(() => {
    if (data) {
      setCategories(data.data);
      console.log('here');
    }
  }, [data]);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}>
      <Category
        onPress={() => {
          setCategory({label: 'All'});
        }}
        active={category.label === 'All' ? true : false}
        title={'All'}
      />
      {[...categories].map((cat, index) => (
        <Category
          key={index}
          onPress={() => {
            setCategory(cat);
          }}
          active={
            !category ? false : cat.label === category.label ? true : false
          }
          title={cat.label}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    // height: 35,
    marginBottom: 10,
    // flexDirection: 'row',
    // marginLeft: 10,
    paddingVertical: 5,
    borderColor: 'rgba(112,112,112,0.5)',
    // borderTopWidth: 0.3,
    // borderBottomWidth: 0.3,
  },
});
