import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import TvdbApiClient from './TvDBApiClient';

class GameList extends Component
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
  }

  componentDidMount()
  {
      this.loadgames();
  }

  async loadgames()
  {
    this.setState({
      loading: true,

    });

    var games = this.state.games;


    try
    {
    let result = await this.loadPage(this.currentPage);
    games = result.resultGames;
    console.log(games);
    }
    catch(error)
    {

      console.error(error);
    }

    this.setState({
      loading: false,
      games: games
    });
  }

  async loadPage(page)
  {
    return [];
  }

  render(){
    return (
      <View style={{flex: 1}}>
          <FlatList
            data={this.state.games}
            renderItem={this.renderGameItem.bind(this)}
        //    onEndReached={(this.state.games.length == 0 || this.state.loading
        //       ? null: this.handleEndOfScroll.bind(this))}
            />
      </View>
    );
  }

  renderGameItem({item})
  {
    return(
    <TouchableHighlight 
        onPress={this.onGamePressed.bind(this, item)}
        underlayColor='lightgray'
    >
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 50, height: 75}} 
       source={item.background_image!=null?{
         uri: item.background_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text>{item.released}</Text>
        </View>
      </View>
    </TouchableHighlight>
      );
  }

  onGamePressed(game)
  {
      this.props.navigation.navigate("gameDetails", {game: game});
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



export default GameList;
