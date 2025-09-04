import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/articles`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-500">Edit app/index.tsx to edit this screen</Text>
      <Text className="text-dark">{JSON.stringify(data)}</Text>
    </View>
  );
}