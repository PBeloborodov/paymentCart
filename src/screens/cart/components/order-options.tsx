import {StyleSheet, Switch, Text, View} from 'react-native';
import {store} from '../../list-card/store';
import {observer} from 'mobx-react-lite';

export const OrderOptions = observer(() => (
  <View>
    {store.options.map(option => (
      <View key={option.id} style={styles.wrapCard}>
        <Text>{option.name}</Text>
        <Switch
          value={option.selected}
          onValueChange={() => store.toggleOption(option.id)}
        />
      </View>
    ))}
  </View>
));

const styles = StyleSheet.create({
  wrapCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
