import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screens/SplashScreen'
import WelcomScr from './Screens/WelcomScr';
import HomeScreen from './Screens/HomeScreen';
import SearchScree from './Screens/SearchScree';
import ProfileScreen from './Screens/ProfileScreen';
import LikedRecipe from './Screens/LikedRecipe';
import UserPost from './Screens/UserPost';
import Entypo from '@expo/vector-icons/Entypo';
import RecipeDetailScreen from './Screens/RecipeDetailScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategorieDetail from './Screens/CategorieDetail';
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      
      screenOptions={({route})=>({
        tabBarIcon:({focused,color,size})=>{
          if(route.name==="Home"){
            return focused? (
              <Entypo name="home" size={26} color="#973838" />
              
            ):(
              <Entypo name="home" size={26} color="#973838" />
            )
          } else if(route.name==="Post"){
            return focused? (<MaterialCommunityIcons name="post" size={26} color="#973838" />):(<MaterialCommunityIcons name="post-outline" size={24} color="#973838" />)
          }else if(route.name==="Liked"){
            return focused? (<MaterialCommunityIcons name="heart" size={26} color="#973838" />):(<MaterialCommunityIcons name="heart-outline" size={24} color="#973838" />)
          }else if(route.name==="Profile"){
            return focused? (<MaterialCommunityIcons name="account" size={28} color="#973838" />):(<MaterialCommunityIcons name="account-outline" size={24} color="#973838" />)
          }
        },
        tabBarActiveTintColor: '#973838',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12, // Increase text size
          fontWeight: 'bold', // Make text bold
          paddingBottom:10,
          
        },
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.99)', // Transparent white background for a floating effect
          paddingVertical: 19, // Slightly reduced padding for a clean look
          borderRadius: 20, // Rounded corners for a premium feel
          marginHorizontal: 14, // Margin for positioning
          marginBottom: 13, // Space from the bottom edge for a floating effect
          elevation: 10, // Adds shadow for a floating effect
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: -4 }, // Slight offset for floating effect
          shadowOpacity: 0.2, // Subtle shadow
          shadowRadius: 10, // Soft shadow for a smooth appearance
          position: 'absolute', // Places the tab bar at the bottom
          bottom:0,
          left:0,
          right:0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Post" component={UserPost} options={{ headerShown: false }} />
      <Tab.Screen name="Liked" component={LikedRecipe} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      
    </Tab.Navigator>
  );
}
const Navigation = () => {
    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Welcome" component={WelcomScr} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={TabNavigator} options={{headerShown:false}}/>
            <Stack.Screen name="Search" component={SearchScree} options={{headerShown:false}}/>
            <Stack.Screen name="Detail" component={RecipeDetailScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Post" component={UserPost} options={{ headerShown: false }} />
            <Stack.Screen name="Liked" component={LikedRecipe} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryDetail" component={CategorieDetail} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Navigation