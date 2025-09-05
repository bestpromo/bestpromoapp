import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'offer' | 'delivery' | 'general';
}

export default function Notificacoes() {
  const router = useRouter();
  const notifications: Notification[] = []; // Lista vazia para simular ausência de notificações
  
  // Exemplo de notificações (descomente para testar)
  // const notifications = [
  //   {
  //     id: 1,
  //     title: "Nova oferta disponível!",
  //     message: "Tênis Nike com 50% de desconto por tempo limitado",
  //     time: "2 min atrás",
  //     read: false,
  //     type: "offer"
  //   },
  //   {
  //     id: 2,
  //     title: "Pedido entregue",
  //     message: "Seu pedido #12345 foi entregue com sucesso",
  //     time: "1 hora atrás",
  //     read: true,
  //     type: "delivery"
  //   }
  // ];

  const handleBackPress = () => {
    router.push('/(tabs)/(index)');
  };

  if (notifications.length === 0) {
    return (
      <View className="flex-1 bg-gray-50">
        {/* Header personalizado */}
        <View className="bg-primary pt-12 pb-4 px-4">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={handleBackPress}
              className="p-2 mr-4"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">
              Notificações
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1">
          <View className="p-4">
            <View className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <View className="items-center space-y-4">
                <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                  <Ionicons name="notifications-outline" size={32} color="#9ca3af" />
                </View>
                <Text className="text-center text-gray-500 text-base">
                  Você ainda não tem notificações.
                </Text>
                <Text className="text-center text-gray-400 text-sm mt-2">
                  Quando houver novidades importantes, elas aparecerão aqui!
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header personalizado */}
      <View className="bg-primary pt-12 pb-4 px-4">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={handleBackPress}
            className="p-2 mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            Notificações ({notifications.length})
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4 space-y-4">
          {/* Lista de Notificações */}
          {notifications.map((notification: Notification) => (
            <View 
              key={notification.id}
              className={`p-4 bg-white rounded-lg shadow-sm border border-gray-100 ${
                !notification.read ? 'border-l-4 border-l-primary' : ''
              }`}
            >
              <View className="flex-row items-start space-x-3">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                  <Ionicons 
                    name={notification.type === 'offer' ? 'pricetag' : 'checkmark-circle'} 
                    size={20} 
                    color="#FE6030" 
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="font-semibold text-gray-800 mb-1">
                    {notification.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {notification.time}
                  </Text>
                </View>
                
                {!notification.read && (
                  <View className="w-2 h-2 bg-primary rounded-full" />
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}