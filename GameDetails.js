import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import TvdbApiClient from './TvDBApiClient';

export default class GameDetails extends Component
{

  constructor(props)
  {
    super(props);

    this.apiClient = new TvdbApiClient();
    this.currentPage = 1;
    this.state = {
      loading: false,
      games: []
    };

    let params = this.props.route.params;
    let game = params.game;
    this.props.navigation.setOptions({
        title: params.game.name
    });
  }

  componentDidMount()
  {
      
  }

  
  render()
  {
    return(
    <View style={{flexDirection: 'row', padding: 10}}>
       
    </View>
      );
  }

  handleEndOfScroll()
  {
  //  if(this.state.games.loading || this.state.games.length == 0)
  //  {
  //    return;
  //  }
  //  this.currentPage++;
  //  this.loadgames();
  }

}


