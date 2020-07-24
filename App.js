import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import GameDetails from './GameDetails';
import GtaGameList from './GtaGameList';
import FFGameList from './FFGameList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage'

const Stack = createStackNavigator();


const Tab = createBottomTabNavigator();

type Props = {};
export default class App extends Component<Props>
{


  constructor(props)
  {
    super(props);

    this.state = 
    {
      ready: false
    };

  }

  componentDidMount()
  {
    AsyncStorage.getItem('lastSelectedTab').then((lastSelectedTab) => {
      this.createMainNavigation(lastSelectedTab);
    });
  }

createMainNavigation(initialTab)
{
  this.gtaGameListStackNavigator = () => {

    return (
    <Stack.Navigator>
      <Stack.Screen name="gtaGames" component={GtaGameList}/>
      <Stack.Screen name="gameDetails" component={GameDetails}/>
    </Stack.Navigator>
    );
  };

  this.ffGameListStackNavigator = () => 
  {
    return (
    <Stack.Navigator>
      <Stack.Screen name="ffGames" component={FFGameList}/>
      <Stack.Screen name="gameDetails" component={GameDetails}/>
    </Stack.Navigator>
    );
  };

  this.mainTab = () => {
    function tabBarOnPress(tabName) {
      return (event) => {
        AsyncStorage.setItem('lastSelectedTab', tabName);
      };
    };
  

  return (
    <Tab.Navigator initialRouteName={initialTab}>
        <Tab.Screen
          name="gtaGameList"
          component={this.gtaGameListStackNavigator}
          listeners={{tabPress: tabBarOnPress("gtaGameList")}}
          options={{
            title: "GTA Games",
            tabBarIcon: ({ color, size }) => (
              <Icon name='ios-car' size={size} color={color} />
              ),
          }}
        />
        <Tab.Screen
          name="ffGameList"
          component={this.ffGameListStackNavigator}
          listeners={{tabPress: tabBarOnPress("ffGameList")}}
          options={{
            title: "Final Fantasy Games",
            tabBarIcon: ({color, size }) => <Icon name='md-bonfire' color={color} size={size}/>
          }}
        />
        </Tab.Navigator>
  );

};
this.navigationContainer = () => {
  return (<NavigationContainer><this.mainTab /></NavigationContainer>);
};


    this.setState({
      ready: true,
    });
  }

  render() {
    return (
        this.state.ready ? <this.navigationContainer/> : <View/>
        
    );
  }


}