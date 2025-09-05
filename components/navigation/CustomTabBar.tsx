import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const rufusIcon = require('@/assets/images/rufus.png');

// https://salamina.tech/blog/post/custom-tab-bar-tab-navigation-expo-react-native/
export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  
  // Filtrar rotas que devem ser exibidas no tab bar (excluir notificacoes)
  const visibleRoutes = state.routes.filter((route) => {
    return route.name !== 'notificacoes';
  });
  
  const tabWidth = tabBarWidth / visibleRoutes.length;
  const translateX = useSharedValue(state.index * tabWidth);

  const indicatorPadding = 20; // px
  const indicatorWidth =
    tabWidth > 2 * indicatorPadding ? tabWidth - 2 * indicatorPadding : tabWidth;

  useEffect(() => {
    translateX.value = withTiming(state.index * tabWidth + indicatorPadding, { duration: 250 });
  }, [state.index, tabWidth, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className="flex-row bg-white relative border-t border-gray-200"
      onLayout={(e) => setTabBarWidth(e.nativeEvent.layout.width)}>
      {/* Animated Tab Indicator */}
      {tabBarWidth > 0 && (
        <Animated.View
          className="absolute top-0 left-0 z-10 bg-secondary rounded-b-lg h-1"
          style={[{ width: indicatorWidth }, indicatorStyle]}
        />
      )}
      {visibleRoutes.map((route, visibleIndex) => {
        const { options } = descriptors[route.key];
        const originalIndex = state.routes.findIndex(r => r.key === route.key);
        const isFocused = state.index === originalIndex;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={visibleIndex}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            android_ripple={{
              color: '#A7AFB520', // Cor primária com transparência
              borderless: true,
              radius: 40, // Tamanho do ripple
            }}
            className={`flex-1 items-center justify-center py-2 pb-safe`}>
            <View className="items-center">
              {options.tabBarIcon && route.name !== 'rufus' ? (
                options.tabBarIcon({
                  focused: isFocused,
                  color: 'black',
                  size: 24,
                })
              ) : (
                <Image source={rufusIcon} style={{ width: 40, height: 40 }} />
              )}
              {route.name !== 'rufus' && (
                <Text className="text-xs mt-1 text-gray-600">
                  {options.title || route.name}
                </Text>
              )}
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}