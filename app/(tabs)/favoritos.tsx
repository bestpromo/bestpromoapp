import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  cashback?: string;
  rating?: number;
}

const Favoritos = () => {
  // Exemplo de produtos favoritos - em produção virá do estado global/API
  const favoriteProducts: Product[] = [
    {
      id: '1',
      title: 'Smartphone Samsung Galaxy A54',
      price: 'R$ 1.299,00',
      originalPrice: 'R$ 1.499,00',
      image: 'https://via.placeholder.com/150',
      cashback: '5%',
      rating: 4.5
    },
    {
      id: '2',
      title: 'Notebook Acer Aspire 5',
      price: 'R$ 2.199,00',
      originalPrice: 'R$ 2.499,00',
      image: 'https://via.placeholder.com/150',
      cashback: '8%',
      rating: 4.3
    }
  ];

  const renderFavoriteProduct = (product: Product) => (
    <TouchableOpacity key={product.id} className="flex-row p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-3">
      <Image 
        source={{ uri: product.image }} 
        className="w-20 h-20 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="font-semibold text-gray-800 text-sm mb-1" numberOfLines={2}>
          {product.title}
        </Text>
        
        <View className="flex-row items-center mb-2">
          <Text className="text-lg font-bold text-primary">
            {product.price}
          </Text>
          {product.originalPrice && (
            <Text className="text-gray-500 line-through ml-2 text-sm">
              {product.originalPrice}
            </Text>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          {product.cashback && (
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-green-700 text-xs font-medium">
                Cashback {product.cashback}
              </Text>
            </View>
          )}
          
          <TouchableOpacity className="p-1">
            <Ionicons name="heart" size={20} color="#FE6030" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Meus Favoritos
        </Text>
        
        {favoriteProducts.length > 0 ? (
          <View>
            {favoriteProducts.map(renderFavoriteProduct)}
          </View>
        ) : (
          <View className="items-center justify-center py-16">
            <Ionicons name="heart-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg font-medium mt-4 mb-2">
              Nenhum favorito ainda
            </Text>
            <Text className="text-gray-400 text-center px-8">
              Adicione produtos aos seus favoritos para encontrá-los facilmente aqui
            </Text>
            
            <TouchableOpacity className="bg-primary px-6 py-3 rounded-lg mt-6">
              <Text className="text-white font-semibold">
                Explorar Produtos
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default Favoritos;