import {ScrollView, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {Category} from './Category';
import {AppContext} from '../../state/AppContext';

const categories = [
  {title: 'BTC'},
  {title: 'ETH'},
  {title: 'USDT'},
  {title: 'CELO'},
  {title: 'CUSD'},
];

const CategoryList = ({}) => {
  const {setCategory, category} = useContext(AppContext);
  //   const {category} = useCategory();
  // console.log(categories);
  //   const {navigate} = useNavigation();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={styles.container}>
      {[...categories].map((cat, index) => (
        <Category
          key={index}
          onPress={() => {
            setCategory(cat);
          }}
          active={
            !category ? false : cat.title === category.title ? true : false
          }
          title={cat.title}
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
