import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Alert, Switch, View, Text, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  showButton?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
}

const ProfileScreen = () => {
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [versionClickCount, setVersionClickCount] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const router = useRouter();

  const handleClearSearchHistory = () => {
    Alert.alert("Em desenvolvimento", "Esta funcionalidade estará disponível em breve.");
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Alert.alert("Configuração salva", `Notificações ${value ? "ativadas" : "desativadas"}`);
  };

  const handleSupportPress = () => {
    router.push('/(tabs)/atendimento');
  };

  const handlePrivacyPolicyPress = () => {
    setShowPrivacyModal(true);
  };

  const policyText = `POLÍTICA DE PRIVACIDADE

Esta Política de Privacidade estabelece como o aplicativo BestPromo coleta, armazena, utiliza e protege suas informações pessoais.

1. INFORMAÇÕES QUE COLETAMOS

1.1. Informações fornecidas voluntariamente:
• Dados de cadastro e perfil
• Histórico de buscas e preferências
• Produtos favoritados
• Interações com o aplicativo

1.2. Informações coletadas automaticamente:
• Dados de navegação e uso do aplicativo
• Informações do dispositivo (modelo, sistema operacional)
• Dados de localização (quando autorizado)
• Logs de acesso e atividade

2. COMO UTILIZAMOS SUAS INFORMAÇÕES

2.1. Finalidades do tratamento:
• Fornecer e melhorar nossos serviços
• Personalizar sua experiência no aplicativo
• Enviar notificações relevantes sobre ofertas
• Realizar análises estatísticas e de comportamento
• Cumprir obrigações legais

3. COMPARTILHAMENTO DE DADOS

3.1. Não vendemos suas informações pessoais para terceiros.

3.2. Podemos compartilhar dados com:
• Parceiros comerciais para disponibilizar ofertas
• Prestadores de serviços técnicos
• Autoridades competentes quando exigido por lei

4. ARMAZENAMENTO E SEGURANÇA

4.1. Seus dados são armazenados em servidores seguros.
4.2. Implementamos medidas técnicas e organizacionais adequadas.
4.3. Dados locais são armazenados no dispositivo com criptografia.

5. SEUS DIREITOS

Você tem direito a:
• Acessar seus dados pessoais
• Corrigir informações incorretas
• Solicitar exclusão de dados
• Portabilidade de dados
• Revogar consentimentos

6. RETENÇÃO DE DADOS

Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas ou conforme exigido por lei.

7. ALTERAÇÕES NESTA POLÍTICA

Esta política pode ser atualizada periodicamente. Notificaremos sobre mudanças significativas através do aplicativo.

8. CONTATO

Para dúvidas sobre esta política, entre em contato:
Email: privacidade@bestpromo.com.br

Última atualização: Janeiro 2025`;

  const configItems: MenuItem[] = [
    {
      title: "Histórico de Busca",
      subtitle: "Gerencie seus termos de busca salvos",
      icon: "search-outline",
      onPress: () => {},
      showButton: true,
      buttonText: "Limpar Histórico",
      buttonAction: handleClearSearchHistory,
    },
    {
      title: "Notificações",
      subtitle: notificationsEnabled ? "Notificações ativadas" : "Notificações desativadas",
      icon: "notifications-outline",
      onPress: () => {},
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: handleNotificationToggle,
    },
    {
      title: "Política de Privacidade",
      subtitle: "Leia nossa política de privacidade",
      icon: "information-circle-outline",
      onPress: handlePrivacyPolicyPress,
    },
    {
      title: "Suporte",
      subtitle: "Central de ajuda e contato",
      icon: "help-circle-outline",
      onPress: handleSupportPress,
    },
  ];

  const MenuItem = ({ item, isLast = false }: { item: MenuItem; isLast?: boolean }) => (
    <>
      <TouchableOpacity 
        onPress={item.showSwitch || item.showButton ? undefined : item.onPress} 
        activeOpacity={item.showSwitch || item.showButton ? 1 : 0.7}
        disabled={item.showSwitch || item.showButton}
        className="px-6 py-4"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 space-x-4">
            <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name={item.icon as any} size={20} color="#6b7280" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                {item.title}
              </Text>
              <Text className="text-sm text-gray-500">
                {item.subtitle}
              </Text>
            </View>
          </View>
          
          {item.showSwitch ? (
            <Switch
              value={item.switchValue}
              onValueChange={item.onSwitchChange}
              trackColor={{ false: '#d1d5db', true: '#FE6030' }}
              thumbColor={item.switchValue ? '#ffffff' : '#f4f3f4'}
            />
          ) : item.showButton ? (
            <TouchableOpacity
              onPress={item.buttonAction}
              className="border border-red-200 bg-red-50 px-3 py-1 rounded"
            >
              <Text className="text-red-600 text-xs">
                {item.buttonText}
              </Text>
            </TouchableOpacity>
          ) : (
            <Ionicons name="chevron-forward" size={16} color="#9ca3af" />
          )}
        </View>
      </TouchableOpacity>
      {!isLast && <View className="h-px bg-gray-200 mx-6" />}
    </>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Título da Seção */}
        <View className="px-6 py-4">
          <Text className="text-2xl font-bold text-gray-900">
            Perfil
          </Text>
        </View>

        {/* Configurações Section */}
        <View className="bg-white mx-4 rounded-lg shadow-sm">
          <View>
            {configItems.map((item, index) => (
              <MenuItem 
                key={index} 
                item={item} 
                isLast={index === configItems.length - 1} 
              />
            ))}
          </View>
        </View>

        {/* Painel de Debug: Variáveis do extra (apenas após 10 cliques na versão) */}
        {showDebugPanel && (
          <View className="bg-gray-100 mt-4 mx-4 rounded-lg p-4">
            <Text className="text-base font-bold mb-2">Modo Debug Ativado:</Text>
            <Text className="text-xs text-gray-700 mb-1">
              App funcionando corretamente
            </Text>
          </View>
        )}

        {/* App Info - clique 10x para mostrar painel de debug */}
        <View className="items-center py-8">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setVersionClickCount((prev) => {
                const next = prev + 1;
                if (next >= 10) {
                  setShowDebugPanel(true);
                }
                return next >= 10 ? 0 : next;
              });
            }}
          >
            <Text className="text-sm text-gray-400">
              Bestpromo v1.0.0
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal da Política de Privacidade */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-white">
          {/* Header do Modal */}
          <View className="bg-primary px-6 py-4 pt-12">
            <View className="flex-row items-center justify-between">
              <Text className="text-white text-lg font-bold">
                Política de Privacidade
              </Text>
              <TouchableOpacity
                onPress={() => setShowPrivacyModal(false)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Conteúdo do Modal */}
          <ScrollView className="flex-1 p-6">
            <Text className="text-gray-700 leading-6">
              {policyText}
            </Text>
          </ScrollView>

          {/* Footer do Modal */}
          <View className="p-6 border-t border-gray-200">
            <TouchableOpacity
              onPress={() => setShowPrivacyModal(false)}
              className="bg-primary py-3 rounded-lg"
            >
              <Text className="text-white text-center font-semibold">
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;