import { View, Text, ScrollView, Image, Button, FlatList, Modal, RefreshControl, StyleSheet, Dimensions, Animated  } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { format, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';
import * as Updates from "expo-updates"

import { formatInTimeZone } from 'date-fns-tz';

const IncomeBox = ({amount, date}) => {

  const dateObj = parseISO(date);
  const timeZone = 'America/Lima';

  const formattedDate = format(dateObj, "d MMM. yyyy", { locale: es });
  const formattedTime = formatInTimeZone(dateObj, timeZone, "HH:mm aaa", { locale: es });

  const formattedAmount = `S/${Number(amount).toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(3)}`;

  return (
    <View className="mx-3 bg-blue-800 flex flex-row justify-between items-center px-4 py-4 border-b border-gray-200 mb-2">
      <View>
        <Text className={`${amount == 0 ? "text-orange-400" : "text-green-300"} font-semibold text-lg`}>{formattedDate}</Text>
        <Text className="text-gray-200 text-sm">
          {formattedTime}
        </Text>
      </View>
      <View>
        <Text className="text-white text-xl ">{formattedAmount}</Text>
      </View>
    </View>
  )
}

const IncomesList = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [opacity] = useState(new Animated.Value(1)); 

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [refreshing, setRefreshing] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [ahorroTotal, setAhorroTotal] = useState(0.00);

  const fetchAllIncomes = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch('https://chanch-e.onrender.com/api/incomes');
      const data = await response.json();
      setIncomes(data);
      const totalAhorros = await fetch('https://chanch-e.onrender.com/api/incomes/last');
      const totalData = await totalAhorros.json();

      const formattedAmount = `S/${Number(totalData.total_savings).toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).slice(3)}`;
      setAhorroTotal(formattedAmount);

    } catch (error) {
      console.error("Error fetching: ", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllIncomes();
  }, [fetchAllIncomes]);

  const onRefresh = useCallback(() => {
    fetchAllIncomes();
  }, [fetchAllIncomes]);

  const handleAccept = async () => {
    try {
      const response = await fetch('https://chanch-e.onrender.com/api/incomes/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      setModalVisible(false);

      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        // Reinicia la app después de la animación
        Updates.reloadAsync()
      });

    } catch (error) {
      console.error("Error fetching: ", error);
    }
  };

  return (
    <Animated.View style={{opacity}}>
    <SafeAreaView className="h-full bg-white">
      <View className="mt-4 flex justify-center items-center">
        <Image
          source={images.toplogo}
          className="w-[200px] h-[70px] mb-3"
          resizeMode="contain"
        />
      </View>

      <View>
        <View className="flex flex-row-reverse mr-3 mb-1">
          <Button
            title="Reset"
            onPress={handleOpenModal}
          />
        </View>

        <View className="mb-0 mx-4 flex flex-row justify-between items-end">
          <Text className="text-blue-800 font-normal text-4xl">{`Últimos\ningresos `}</Text>
          <Text className="font-bold text-3xl text-blue-900">{ahorroTotal}</Text>
        </View>
        <Text className="text-center text-blue-900">────────────────────────────────────</Text>

        <View>
          <FlatList
            data = {incomes}
            renderItem={ ({item}) => (
              <IncomeBox
                amount={item.last_income}
                date={item.income_datetime}
              />
            )}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
          </FlatList>
        </View>
      </View>

      {refreshing && (
        <View style={styles.overlay} />
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal} 
      >
        <View className="flex-1 justify-center items-center bg-white bg-opacity-80">
          <View className="bg-white w-11/12 p-8 rounded-lg">
            <Text className="text-center text-blue-800 text-2xl font-semibold">¿Desea reiniciar los ahorros?</Text>
            <View className="flex flex-row justify-between mt-8">
              <Button
                color="green"
                title="Aceptar"
                onPress={handleAccept}
              />
              <Button
                color="red"
                title="Cancelar"
                onPress={handleCloseModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5, 
    zIndex: 2, 
  },
});

export default IncomesList