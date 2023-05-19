import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="text-5xl text-zinc-50">Hello World!</Text>
      <StatusBar style="light" translucent />
    </View>
  );
}