import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {FC, useCallback} from 'react';
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
  CommonActions,
  EventMapBase,
  Route,
} from '@react-navigation/native';
import IconBasket from '../../assets/svg/icon-basket';
import IconProducts from '../../assets/svg/icon-products';
import {IconProps} from '../../assets/svg/types';

type TabRouteName = 'listCard' | 'checkout';
type TabIcons = Record<string, FC<IconProps>>;

const ICON_TABS: TabIcons = {
  listCard: IconProducts,
  checkout: IconBasket,
};

export const TabBar = ({
  state,
  navigation,
}: {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, EventMapBase>;
}) => {
  const onPressTab = useCallback(
    (route: Route<string>, isFocused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      } as const);

      if (!isFocused && !event.defaultPrevented) {
        navigation.dispatch(
          CommonActions.navigate({
            name: route.name,
            params: route.params,
          }),
        );
      }
    },
    [navigation],
  );

  return (
    <View style={styles.wrap}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const routeName = route.name as TabRouteName;
        const Icon = ICON_TABS[routeName];
        return (
          <Pressable
            key={route.key}
            onPress={() => onPressTab(route, isFocused)}
            style={({pressed}) => [styles.tabButton]}>
            <Icon color={isFocused ? 'green' : 'black'} />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    height: 90,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
