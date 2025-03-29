import {View, StyleSheet, ImageBackground} from 'react-native';
import React, {FC} from 'react';
import {store} from '../../../store';
import {Product} from '../types';
import {observer} from 'mobx-react-lite';
import {Avatar, Card, Button, Text} from 'react-native-paper';

const ProductCard: FC<{product: Product}> = observer(({product}) => {
  const hasInCart = store.hasInCart(product.id);

  return (
    <Card style={styles.wrapCard}>
      <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      <Card.Title
        title={product.name}
        titleStyle={styles.title}
        subtitle={`${product.price}₽`}
        subtitleStyle={styles.subtitle}
      />
      <Card.Actions>
        <Button
          mode={hasInCart ? 'contained-tonal' : 'contained'}
          onPress={() => {
            hasInCart
              ? store.removeProduct(product.id)
              : store.addProduct(product.id);
          }}>
          {hasInCart ? 'Удалить' : 'Добавить'}
        </Button>
      </Card.Actions>
    </Card>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  wrapCard: {
    width: '49%',
  },
  img: {width: '100%', height: 100},
  title: {fontSize: 20, fontWeight: 'bold'},
  subtitle: {fontSize: 18},
});
