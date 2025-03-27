import {observer} from 'mobx-react-lite';
import {FlatList, StyleSheet, Text, View, Pressable} from 'react-native';
import {store} from '../list-card/store';
import ProductCard from '../list-card/components/product-card';
import {OrderOptions} from './components/order-options';

export const Cart = observer(() => (
  <View style={styles.wrap}>
    <View style={{flex: 1}}>
      <FlatList
        data={store.cart}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={item => String(item.id)}
        initialNumToRender={10}
        numColumns={2}
        horizontal={false}
        onEndReachedThreshold={0.5}
        style={{flex: 1}}
        columnWrapperStyle={{
          margin: 5,
          justifyContent: 'space-between',
        }}
      />
      <Text>Итого: {store.totalPrice}₽</Text>
    </View>
    <OrderOptions />
    <Pressable style={styles.btn} onPress={() => store.submitOrder()}>
      <Text style={styles.textBtn}>Оформить заказ</Text>
    </Pressable>
  </View>
));
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
  },
  btn: {
    width: '100%',
    marginTop: 10,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
