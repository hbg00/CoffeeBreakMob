import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import * as Icons from 'phosphor-react-native';
import { verticalScale } from '@/utils/screenScale';
import { colors, spacingY } from '@/constants/theme';


export default function BottomTabsNav({ 
  state,
  descriptors,
  navigation 
}: BottomTabBarProps) {
    const bottomTabBarIcons: any = {
        index: (isFocused: boolean) => (
            <Icons.CookieIcon
                size={verticalScale(40)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.green : colors.black}
            />
        ),
        basket: (isFocused: boolean) => (
            <Icons.BasketIcon
                size={verticalScale(40)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.green : colors.black}
            />
        ),
        fav: (isFocused: boolean) => (
            <Icons.HeartIcon
                size={verticalScale(40)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.green : colors.black}
            />
        ),
        profile: (isFocused: boolean) => (
            <Icons.UserIcon
                size={verticalScale(40)}
                weight={isFocused ? 'fill' : 'regular'}
                color={isFocused ? colors.green : colors.black}
            />
        ),
    };
     return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label:any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={ styles.tabberItem }
          >
            <Text
              style={{ color: isFocused ? colors.green : colors.green }}
            >
            {
              bottomTabBarIcons[route.name] && bottomTabBarIcons[route.name](isFocused)
            }
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar:{
    flexDirection: 'row',
    width: "100%",
    height: verticalScale(80),
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabberItem: {
    marginBottom: spacingY._5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});