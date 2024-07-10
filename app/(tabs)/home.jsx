import { View, Text, Image, SafeAreaView, ScrollView, ImageBackground, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { images } from '../../constants'

const Home = () => {

  const [ahorroTotal, setAhorroTotal] = useState(0.00);
  const [numeroTotalIngresos, setNumeroTotalIngresos] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTotalSavings = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch('https://chanch-e.onrender.com/api/incomes/last');
      const data = await response.json();
      console.log(data);
      const formattedAmount = `S/${Number(data.total_savings).toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(3)}`;
      setAhorroTotal(formattedAmount);
      setNumeroTotalIngresos(data.incomes_count);
    } catch (error) {
      console.error("Error fetching: ", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTotalSavings();
  }, [fetchTotalSavings]);

  const onRefresh = useCallback(() => {
    fetchTotalSavings();
  }, [fetchTotalSavings]);

  return (
    <SafeAreaView className="h-full bg-white relative">
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View className="mt-16 flex justify-center items-center">
          <Image
            source={images.toplogo}
            className="w-[200px] h-[70px] mb-10"
            resizeMode="contain"
          />
        </View>

        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View>
            <ImageBackground source={images.ahorros_fondo} className="">
              <Text className="text-center text-white text-3xl mt-4">Ahorros</Text>
              <Text className="text-center text-gray-300 text-xl mt-5">PEN</Text>
              <Text className="text-center font-semibold text-white text-6xl mt-5">{ahorroTotal}</Text>
              <Text className="text-center text-gray-100 text-xl mt-8">Balance total</Text>
              <Text className="text-center text-gray-100 text-xl mb-12"> de dinero</Text>
            </ImageBackground>

          </View>

          <View className="flex-1 items-center justify-center">
            <Text className="text-blue-500 font-semibold text-xl">Número total</Text>
            <Text className="text-blue-500 font-semibold text-xl">de ingresos</Text>
            <View className="mt-10">
              <Text className="py-6">
                <Text className=" font-semibold text-6xl">{numeroTotalIngresos}</Text>
                <Text className=" text-blue-300 font-normal text-3xl">     veces</Text>
              </Text>
            </View>
          </View>

        </ScrollView>
      </ScrollView>
      {refreshing && (
        <View style={styles.overlay} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
    opacity: 0.5, 
    zIndex: 4, 
  },
});

export default Home