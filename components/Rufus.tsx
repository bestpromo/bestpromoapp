import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

const CUPONS = [
  { code: "PROMO10", description: "10% off on orders over $50" },
  { code: "FREESHIP", description: "Free shipping on orders over $25" },
  { code: "BUY1GET1", description: "Buy one, get one free on select items" },
]

const Rufus = () => {
  return (
    <ScrollView className="flex-1 bg-white pb-safe mb-10" contentContainerClassName={"pb-12"}>
      <View className="p-10 border-b-0 border-gray-300 mb-4">
        <Text className="text-2xl font-bold mb-4 text-black dark:text-white">Cupons</Text>
        {CUPONS.map((cupom, index) => (
          <View key={index} className="flex-1 flex-row mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700">
            <View className="w-10/12">
              <Text className="text-lg font-semibold text-black dark:text-white">{cupom.code}</Text>
              <Text className="text-gray-600 dark:text-gray-300">{cupom.description}</Text>
            </View>
            <View className="w-2/12 items-center ">
              <Ionicons name="copy-outline" size={24} color="black" />
              <Text className="text-gray-600 dark:text-gray-300">copiar</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Rufus;