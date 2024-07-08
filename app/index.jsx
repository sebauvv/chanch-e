import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

export default function App() {
  return(
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="flex-1 items-center justify-center bg-white">
          <Image
            source={images.pseudoLogo}
            className="w-[370px] h-[150px] mb-10"
            resizeMode="contain"
          />

          <StatusBar style="auto" />
          <Link href="/home" style={{color: 'blue'}}>Iniciar</Link>
          <Image
            source={images.logo}
            className="w-[270px] h-[270px] "
            resizeMode="contain"
          />
        </View>
        <View>
          <Text
            className="text-center text-lg font-semibold text-blue-600 mb-8"
          >
            FISI - 2024-1
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

