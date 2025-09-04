import { StyledStack } from '@/components/navigation/stack';
import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from 'react-native';

const InitialLayout = () => {
  
  const router = useRouter();

  return (
    <StyledStack contentClassName='bg-gray-100 dark:bg-black' headerClassName='bg-dark text-white'>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
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
      />
    </StyledStack>  
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme(); 
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <InitialLayout />
    </ThemeProvider>
  );
}

export default RootLayout;