import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProductList} from './components/product-list';

const ListCard = () => (
  <View style={styles.wrapList}>
    <ProductList />
  </View>
);

export default ListCard;

const styles = StyleSheet.create({
  wrapList: {flex: 1, padding: 20},
  titleList: {fontSize: 24, fontWeight: 'bold'},
  subtitleList: {fontSize: 24, fontWeight: 'bold', marginTop: 20},
});
