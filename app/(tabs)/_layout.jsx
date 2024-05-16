import { Image, View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={
          {
            tabBarShowLabel: false,
            // tabBarActiveTintColor: '#FFA001',
            // tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: '#232533',
              height: 84,
            }
          }
        }>
        <Tabs.Screen 
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home1}
                color={color}
                name="Home"
                focused={focused}
              />
            )
           }}
        />
        <Tabs.Screen 
          name="search"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.search1}
                color={color}
                name="Search"
                focused={focused}
              />
            )
           }}
        />
        <Tabs.Screen 
          name="activity"
          options={{
            title: 'Activity',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.activity}
                color={color}
                name="Activity"
                focused={focused}
              />
            )
           }}
        />
        <Tabs.Screen 
          name="points"
          options={{
            title: 'Points',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.parachute}
                color={color}
                name="Points"
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