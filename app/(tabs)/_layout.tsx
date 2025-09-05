import CustomTabBar from '@/components/navigation/CustomTabBar';
import { StyledTabs } from '@/components/navigation/tabs';
import SearchBar from '@/components/SearchBar';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

const Layout = () => {
  const router = useRouter();
  // const { count } = useCartStore();
  return (
    <StyledTabs 
      headerClassName="bg-primary" 
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="(index)"
        options={{
          title: "Início",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          header: () => <SearchBar />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="atendimento"
        options={{
          title: "Atendimento",
          header: () => <SearchBar />,
          tabBarIcon: ({ color, size }) => (
            <View className="relative">
              <Ionicons name="chatbubbles-outline" color={color} size={size} />
              <View className="absolute -top-2 h-4 w-4 -right-4">
                {/* <Text className="text-md font-bold">{count}</Text> */}
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          header: () => <SearchBar />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rufus"
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push('/(modal)/rufus');
          },
        })}
      />
      <Tabs.Screen
        name="notificacoes"
        options={{
          headerShown: false,
          href: null, // Oculta do tab bar mas mantém a rota acessível
        }}
      />
    </StyledTabs>
  );
};

export default Layout;