import { View, Text, Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};


const TabsLayout = () => {
  return (
    <>
      
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#c8c8c8",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#4284ff",
            borderTopWidth: 1,
            borderTopColor: "#4284ff",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Inicio"
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name="incomes-list"
          options={{
            title: 'Incomes',
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={icons.list}
                color={color}
                name="Ingresos"
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout