import React, { useState, useCallback } from 'react';
import { View, Text, Image, SectionList, FlatList, Dimensions, RefreshControl, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

// Interfaces para tipagem
interface BannerItem {
  id: string;
  image: string;
}

interface ProductItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: string;
  freeShipping?: boolean;
  isFavorite?: boolean;
}

interface Section {
  id: string;
  title: string | null;
  type: 'banner' | 'product-grid';
  data: BannerItem[] | ProductItem[];
  sort: number;
}

const initialSections: Section[] = [
  {
    id: 'banner-principal',
    title: null,
    type: 'banner',
    data: [
      { id: 'b1', image: 'https://media.bestpromo.live/cms/banners/home/banner1.jpeg' },
      { id: 'b2', image: 'https://media.bestpromo.live/cms/banners/home/banner2.jpeg' },
      { id: 'b3', image: 'https://media.bestpromo.live/cms/banners/home/banner3.jpeg' },
      { id: 'b4', image: 'https://media.bestpromo.live/cms/banners/home/banner4.jpeg' },
    ],
    sort: 1, 
  },
  {
    id: 'produtos-destaque',
    title: 'Ofertas do dia',
    type: 'product-grid',
    data: [
      { 
        id: 'p1', 
        name: 'Tênis Nike Air Max 90', 
        price: 259.90, 
        originalPrice: 349.90,
        image: 'https://picsum.photos/200/200?1',
        discount: '26% OFF',
        freeShipping: true,
        isFavorite: false
      },
      { 
        id: 'p2', 
        name: 'Camiseta Adidas Essentials', 
        price: 89.90, 
        originalPrice: 129.90,
        image: 'https://picsum.photos/200/200?2',
        discount: '31% OFF',
        freeShipping: false,
        isFavorite: true
      },
      { 
        id: 'p3', 
        name: 'Relógio Casio Digital', 
        price: 299.90, 
        originalPrice: 499.90,
        image: 'https://picsum.photos/200/200?3',
        discount: '40% OFF',
        freeShipping: true,
        isFavorite: false
      },
      { 
        id: 'p4', 
        name: 'Bolsa Puma Sport', 
        price: 149.90, 
        originalPrice: 199.90,
        image: 'https://picsum.photos/200/200?4',
        discount: '25% OFF',
        freeShipping: false,
        isFavorite: true
      },
    ],
    sort: 2,
  },
  {
    id: 'produtos-moda',
    title: 'Moda',
    type: 'product-grid',
    data: [
      { id: 'p5', name: 'Vestido Floral', price: 89.9, image: 'https://picsum.photos/200/200?5' },
      { id: 'p6', name: 'Calça Jeans', price: 159.9, image: 'https://picsum.photos/200/200?6' },
      { id: 'p7', name: 'Jaqueta Couro', price: 349.9, image: 'https://picsum.photos/200/200?7' },
      { id: 'p8', name: 'Tênis Vans', price: 279.9, image: 'https://picsum.photos/200/200?8' },
    ],
    sort: 3, 
  },
  {
    id: 'banners-secundarios',
    title: null,
    type: 'banner',
    data: [
      { id: 'b5', image: 'https://media.bestpromo.live/cms/banners/home/banner5.jpeg' },
      { id: 'b6', image: 'https://media.bestpromo.live/cms/banners/home/banner6.jpeg' },
      { id: 'b7', image: 'https://media.bestpromo.live/cms/banners/home/banner7.jpeg' },
    ],
    sort: 4,    
  },
  {
    id: 'produtos-tech',
    title: 'Tecnologia',
    type: 'product-grid',
    data: [
      { id: 'p9', name: 'iPhone 15', price: 7999.9, image: 'https://picsum.photos/200/200?9' },
      { id: 'p10', name: 'Macbook Pro', price: 12999.9, image: 'https://picsum.photos/200/200?10' },
      { id: 'p11', name: 'Apple Watch', price: 2999.9, image: 'https://picsum.photos/200/200?11' },
      { id: 'p12', name: 'AirPods Pro', price: 1899.9, image: 'https://picsum.photos/200/200?12' },
    ],
    sort: 5,
  },
  {
    id: 'produtos-gamer',
    title: 'Mundo Gamer',
    type: 'product-grid',
    data: [
      { id: 'p13', name: 'PS5', price: 4299.9, image: 'https://picsum.photos/200/200?13' },
      { id: 'p14', name: 'Xbox Series X', price: 3999.9, image: 'https://picsum.photos/200/200?14' },
      { id: 'p15', name: 'Nintendo Switch', price: 2499.9, image: 'https://picsum.photos/200/200?15' },
      { id: 'p16', name: 'Cadeira Gamer', price: 899.9, image: 'https://picsum.photos/200/200?16' },
    ],
    sort: 6,
  },
  {
    id: 'eletronicos',
    title: 'Eletronicos',
    type: 'product-grid',
    data: [
      { id: 'p13', name: 'PS5', price: 4299.9, image: 'https://picsum.photos/200/200?13' },
      { id: 'p14', name: 'Xbox Series X', price: 3999.9, image: 'https://picsum.photos/200/200?14' },
      { id: 'p15', name: 'Nintendo Switch', price: 2499.9, image: 'https://picsum.photos/200/200?15' },
      { id: 'p16', name: 'Cadeira Gamer', price: 899.9, image: 'https://picsum.photos/200/200?16' },
    ],
    sort: 7,
  },
  {
    id: 'banners-terciarios',
    title: null,
    type: 'banner',
    data: [
      { id: 'b5', image: 'https://media.bestpromo.live/cms/banners/home/banner5.jpeg' },
    ],
    sort: 8,    
  },
  {
    id: 'produtos-farmacia',
    title: 'Farmácia',
    type: 'product-grid',
    data: [
      { id: 'p13', name: 'PS5', price: 4299.9, image: 'https://picsum.photos/200/200?13' },
      { id: 'p14', name: 'Xbox Series X', price: 3999.9, image: 'https://picsum.photos/200/200?14' },
      { id: 'p15', name: 'Nintendo Switch', price: 2499.9, image: 'https://picsum.photos/200/200?15' },
      { id: 'p16', name: 'Cadeira Gamer', price: 899.9, image: 'https://picsum.photos/200/200?16' },
    ],
    sort: 9,
  }
];

export default function Index() {

  const [refreshing, setRefreshing] = useState(false);
  const [sections, setSections] = useState(initialSections);

  // Função para alternar favorito
  const toggleFavorite = (productId: string) => {
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        data: section.type === 'product-grid' 
          ? (section.data as ProductItem[]).map(item => 
              item.id === productId 
                ? { ...item, isFavorite: !item.isFavorite }
                : item
            )
          : section.data
      }))
    );
  };

  // Ordena as seções pelo campo sort antes de exibir (sem mutar o array original)
  const sortedSections = [...sections].sort((a, b) => a.sort - b.sort);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simula uma busca de novos dados
    setTimeout(() => {
      // Em um aplicativo real, você buscaria novos dados de uma API aqui.
      // Para este exemplo, vamos apenas redefinir para o estado inicial.
      setSections(initialSections);
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderBanner = (items: readonly any[]) => (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      renderItem={({ item }) => (
        <Image source={{ uri: item.image }} style={{ width: screenWidth }} className="h-48" resizeMode="cover" />
      )}
    />
  );

  const renderProductGrid = (items: readonly ProductItem[]) => (
    <View className="flex-row flex-wrap justify-between px-2.5">
      {items.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={{ width: (screenWidth - 25) / 2 }} 
          className="mb-4 bg-white border border-gray-200"
          activeOpacity={0.}
        >
          {/* Container da Imagem com Ícone de Favorito */}
          <View className="relative">
            <Image 
              source={{ uri: item.image }} 
              className="w-full h-40" 
              resizeMode="cover"
            />
            
            {/* Ícone de Coração Flutuante */}
            <TouchableOpacity 
              className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full items-center justify-center shadow-md"
              activeOpacity={0.5}
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons 
                name={item.isFavorite ? "heart" : "heart-outline"} 
                size={18} 
                color={item.isFavorite ? "#FE6030" : "#A7AFB5"} 
              />
            </TouchableOpacity>
          </View>

          {/* Conteúdo do Card */}
          <View className="p-3">
            {/* Nome do Produto */}
            <Text 
              className="text-base font-medium text-dark leading-5 mb-2 h-10" 
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>

            {/* Tags */}
            <View className="flex-row gap-1 mb-2">
              {item.discount && (
                <View className="bg-primary px-2 py-1 rounded-md">
                  <Text className="text-white text-xs font-bold">{item.discount}</Text>
                </View>
              )}
              {item.freeShipping && (
                <View className="bg-green-100 px-2 py-1 rounded-md">
                  <Text className="text-green-600 text-xs font-medium">Frete Grátis</Text>
                </View>
              )}
            </View>

            {/* Preços */}
            <View className="space-y-1">
              {item.originalPrice && (
                <Text className="text-sm text-gray-400 line-through">
                  R$ {item.originalPrice.toFixed(2)}
                </Text>
              )}
              <Text className="text-xl font-bold text-emerald-600">
                R$ {item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <>
      <SectionList
        sections={sortedSections}
        keyExtractor={(item, index) => item.id + index}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section }) =>
          section.type === 'product-grid' && section.title ? (
            <Text className="text-2xl font-semibold p-4">{section.title}</Text>
          ) : null
        }
        renderItem={({ section, index }) => {
          // Só renderiza uma vez por seção, pois o renderItem é chamado para cada item da seção
          if (index > 0) {
            return null;
          }

          if (section.type === 'banner') {
            return renderBanner(section.data as BannerItem[]);
          }
          
          if (section.type === 'product-grid') {
            return renderProductGrid(section.data as ProductItem[]);
          }
          
          return null;
          
        }}
      />
    </>
  );
};