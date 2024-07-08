import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from 'expo-router'

// Present in all files in the app directory (like a navbar)

const RootLayout = () => {
  return (
    // <View style={styles.container}>
    //   <Text>RootLayout</Text>
    // </View>
    // Slot: renders the children of the component that is being wrapped

    // <>
    //   <Text>Header</Text>
    //   <Slot /> 
    //   <Text>Footer</Text>
    // </>

    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}} />
      <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})