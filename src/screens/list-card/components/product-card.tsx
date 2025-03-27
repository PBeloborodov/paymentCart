import {View, Text, Button, StyleSheet, ImageBackground} from 'react-native';
import React, {FC} from 'react';
import {store} from '../store';
import {Product} from '../types';
import {observer} from 'mobx-react-lite';

const ProductCard: FC<{product: Product}> = observer(({product}) => {
  const hasInCart = store.hasInCart(product.id);

  return (
    <View style={styles.wrapCard}>
      <ImageBackground
        source={{
          uri: 'https://png.pngtree.com/thumb_back/fw800/background/20230610/pngtree-picture-of-a-blue-bird-on-a-black-background-image_2937385.jpg',
        }}
        style={styles.img}
      />
      <Text>{product.name}</Text>
      <Text>{product.price}₽</Text>
      <Button
        title={hasInCart ? 'Удалить' : 'Добавить'}
        onPress={() =>
          hasInCart
            ? store.removeProduct(product.id)
            : store.addProduct(product.id)
        }
      />
    </View>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  wrapCard: {
    width: '48%',
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  img: {width: '100%', height: 100},
});
