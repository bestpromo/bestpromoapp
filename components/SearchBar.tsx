import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, TextInput, TouchableOpacity, View, Text } from 'react-native';
// import { useMMKVBoolean } from 'react-native-mmkv';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
interface SearchBarProps {
  withBackButton?: boolean;
  notificationCount?: number;
}
const SearchBar = ({ withBackButton = false, notificationCount = 0 }: SearchBarProps) => {
  const router = useRouter();
  // const [showOverlay, setShowOverlay] = useMMKVBoolean('vapi.overlay');

  const onBackPress = () => {
    // if (showOverlay) {
    //   setShowOverlay(false);
    // } else {
      router.back();
    // }
  };

  const onNotificationPress = () => {
    router.push('/notificacoes');
  };

  return (
    <View className="flex-row items-center bg-primary min-h-36 pt-safe px-3">
      {/* {(withBackButton || showOverlay) && ( */}
      {(withBackButton) && (
        <AnimatedTouchableOpacity onPress={onBackPress} entering={FadeInLeft} exiting={FadeOutLeft}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </AnimatedTouchableOpacity>
      )}
      <View className="flex-row items-center flex-1 bg-white rounded-md px-4 mx-2 h-12 gap-4">
        <Ionicons name="search" size={22} className="text-gray-500" />
        <TextInput
          className="flex-1 text-black"
          placeholder="Search or ask a question"
          placeholderTextColor="#888"
          returnKeyType="search"
        />
        <Pressable>
          <Ionicons name="camera-outline" size={22} className="text-gray-500" />
        </Pressable>
        {/* <Pressable onPress={() => setShowOverlay(true)}>
          <Ionicons name="mic-outline" size={22} className="text-gray-500" />
        </Pressable> */}
      </View>
      
      {/* Ícone de Notificação */}
      <TouchableOpacity 
        onPress={onNotificationPress}
        className="w-10 h-10 items-center justify-center ml-2"
        activeOpacity={0.7}
      >
        <View className="relative">
          <Ionicons name="notifications-outline" size={24} color="white" />
          {/* Badge de notificação */}
          {notificationCount > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center border border-white">
              <Text className="text-white text-xs font-bold">
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
