import {observer} from 'mobx-react-lite';
import {useCallback, useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {store} from '../../../store';
import {Product} from '../types';
import ProductCard from './product-card';

const PAGE_SIZE = 20;

export const ProductList = observer(() => {
  const [page, setPage] = useState(1);
  const [listProducts, setListProducts] = useState<Product[]>(
    store.products.slice(0, 1 * PAGE_SIZE),
  );
  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const newProducts = store.products.slice(0, nextPage * PAGE_SIZE);
    setListProducts(newProducts);
    setPage(nextPage);
  }, [page]);

  const renderItem: ListRenderItem<Product> = useCallback(
    ({item}) => <ProductCard product={item} />,
    [],
  );
  return (
    <FlatList
      data={listProducts}
      initialNumToRender={10}
      numColumns={2}
      horizontal={false}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      style={{flex: 1}}
      columnWrapperStyle={{
        margin: 5,
        justifyContent: 'space-between',
      }}
    />
  );
});
