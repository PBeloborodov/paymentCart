import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListCard from '../list-card';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {TabBar} from './tab-bar';
import {Cart} from '../cart';
const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen
            name="listCard"
            component={ListCard}
            options={{headerTitle: 'Список товаров'}}
          />
          <Tab.Screen
            name="checkout"
            component={Cart}
            options={{headerTitle: 'Корзина'}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
