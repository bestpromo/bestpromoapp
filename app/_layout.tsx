import { StyledStack } from '@/components/navigation/stack';
import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from 'react-native';
import { useFonts, Sora_100Thin, Sora_200ExtraLight, Sora_300Light, Sora_400Regular, Sora_500Medium, Sora_600SemiBold, Sora_700Bold, Sora_800ExtraBold } from '@expo-google-fonts/sora';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  
  const router = useRouter();

  return (
    <StyledStack contentClassName='bg-gray-100 dark:bg-black' headerClassName='bg-primary text-white'>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen 
        name="(modal)/rufus" 
        options={{ 
          title: 'Rufus',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          ),
          presentation: 'formSheet', 
          sheetAllowedDetents: [0.50, 0.95],
          sheetInitialDetentIndex: 0,
          sheetGrabberVisible: true,
          contentStyle: { 
            backgroundColor: '#fff' 
          },
        }} 
      /> */}
    </StyledStack>  
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();
  
  let [fontsLoaded] = useFonts({
    Sora_100Thin,
    Sora_200ExtraLight,
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" backgroundColor="#FE6030" />
      <InitialLayout />
    </ThemeProvider>
  );
}

export default RootLayout;