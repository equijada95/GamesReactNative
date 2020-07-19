import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import TvdbApiClient from './TvDBApiClient';
import GameList from './GameList';
import GameDetails from './GameDetails';
import GtaGameList from './GtaGameList';
import FFGameList from './FFGameList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-vector-icons/Ionicons';
// import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

const GtaGameListStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="gtaGames" component={GtaGameList}/>
      <Stack.Screen name="gameDetails" component={GameDetails}/>
    </Stack.Navigator>
  );
};

const FFGameListStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ffGames" component={FFGameList}/>
      <Stack.Screen name="gameDetails" component={GameDetails}/>
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
class App extends Component
{


  render(){
    return (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="gtaGameList"
              component={GtaGameListStackNavigator}
              options={{
                title: "GTA Games",
              //  tabBarIcon: ({ color, size }) => (
              //    <Icon name='ios-heart' size={size} color={color} />
              //    ),
              }}
            />
            <Tab.Screen
              name="ffGameList"
              component={FFGameListStackNavigator}
              options={{
                title: "Final Fantasy Games",
                // tabBarIcon: ({color, size }) => <Icon name='ios-heart' color={color} size={size}/>
              }}
            />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }


}

export default App;