import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Atendimento = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "Como funciona o Bestpromo?",
      answer: "O Bestpromo é uma plataforma que compara preços de produtos em várias lojas parceiras, ajudando você a encontrar as melhores ofertas disponíveis no mercado.",
      category: "Geral"
    },
    {
      id: 2,
      question: "Como posso fazer uma compra?",
      answer: "Você pode navegar pelos produtos, comparar preços e clicar em \"Ir à loja\" para ser redirecionado à loja parceira onde poderá finalizar sua compra.",
      category: "Compras"
    },
    {
      id: 3,
      question: "O Bestpromo é seguro?",
      answer: "Sim! Trabalhamos apenas com lojas parceiras confiáveis e reconhecidas no mercado. Suas compras são realizadas diretamente nas lojas oficiais.",
      category: "Segurança"
    },
    {
      id: 4,
      question: "Como entro em contato com o suporte?",
      answer: "Você pode nos contatar através do WhatsApp, email ou pelo formulário de contato. Nossa equipe responde rapidamente!",
      category: "Suporte"
    },
    {
      id: 5,
      question: "Posso cancelar uma compra?",
      answer: "Para cancelamentos, você deve entrar em contato diretamente com a loja onde realizou a compra, pois seguimos as políticas de cada loja parceira.",
      category: "Compras"
    },
    {
      id: 6,
      question: "Como funciona a comparação de preços?",
      answer: "Nosso sistema atualiza os preços em tempo real das lojas parceiras, permitindo que você veja onde encontrar o melhor preço para cada produto.",
      category: "Geral"
    },
    {
      id: 7,
      question: "Preciso criar uma conta para usar o app?",
      answer: "Não é obrigatório criar uma conta para navegar e comparar preços, mas recomendamos para salvar seus produtos favoritos e ter uma experiência personalizada.",
      category: "Conta"
    },
    {
      id: 8,
      question: "Como adicionar produtos aos favoritos?",
      answer: "Basta tocar no ícone de coração que aparece nos cards dos produtos. Você pode visualizar todos os seus favoritos na aba correspondente.",
      category: "Favoritos"
    }
  ];

  const handleWhatsAppPress = async () => {
    const whatsappUrl = 'https://wa.me/5511978100652';
    
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado.');
      }
    } catch (error) {
      console.error('Erro ao abrir WhatsApp:', error);
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  };

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isExpanded = (id: number) => expandedItems.includes(id);

  const renderFAQItem = (item: FAQItem) => (
    <TouchableOpacity 
      key={item.id}
      onPress={() => toggleExpanded(item.id)}
      className="bg-white rounded-lg shadow-sm border border-gray-100 mb-3"
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 font-semibold text-gray-800 pr-2">
            {item.question}
          </Text>
          <Ionicons 
            name={isExpanded(item.id) ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#FE6030" 
          />
        </View>
        
        {isExpanded(item.id) && (
          <View className="mt-3 pt-3 border-t border-gray-100">
            <Text className="text-gray-600 leading-5">
              {item.answer}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 space-y-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Atendimento
        </Text>
        
        {/* Opções de Atendimento */}
        <View className="space-y-3">
          <TouchableOpacity 
            onPress={handleWhatsAppPress}
            className="flex-row items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
              <Ionicons name="chatbubbles-outline" size={24} color="#FE6030" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">Chat Online</Text>
              <Text className="text-gray-600 text-sm">Fale conosco via WhatsApp</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-4">
              <Ionicons name="mail-outline" size={24} color="#FE6030" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-800">E-mail</Text>
              <Text className="text-gray-600 text-sm">atendimento@bestpromo.live</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View className="mt-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="help-circle-outline" size={24} color="#FE6030" />
            <Text className="text-xl font-bold text-gray-800 ml-2">
              Perguntas Frequentes
            </Text>
          </View>
          
          <View>
            {faqData.map(renderFAQItem)}
          </View>
        </View>

        {/* Horários de Atendimento */}
        <View className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
          <Text className="font-semibold text-gray-800 mb-3">Horários de Atendimento</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Segunda a Sexta</Text>
              <Text className="text-gray-800">8h às 18h</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Sábado</Text>
              <Text className="text-gray-800">8h às 14h</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Domingo</Text>
              <Text className="text-gray-800">Fechado</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Atendimento;