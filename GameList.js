import React, { Component } from 'react';
import {
  FlatList,
  SectionList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import TvdbApiClient from './TvDBApiClient';

export default class GameList extends Component
{

  constructor(props)
  {
    super(props);

    this.apiClient = new TvdbApiClient();
    this.currentPage = 1;
    this.state = {
      games: []
    };
    this.nextPage = 1;
    this.numberOfPages = 1;
    this.loading = false;
  }

  componentDidMount()
  {
      this.loadNextPage();
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

  loadNextPage() {
    if (this.nextPage > this.numberOfPages)
    {
      return;
    }

	if (this.loading)
    {
      return;
    }

    this.loading = true;

    this.loadPage(this.nextPage)
    .then(({ resultGames, numberOfPages }) => {
      let games = resultGames.map((game) => {
        return { key: game.id.toString(), game: game }
      })
      this.setState({ games: this.state.games.concat(games) });
      this.nextPage++;
      this.numberOfPages = numberOfPages;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      this.loading = false;
    });
  }

  loadPage(page)
  {
    throw new Error('You have to implement the method loadPage!');
  }

  

  
//  async loadPage(page)
//  {
//    return [];
//  }

  render(){
    return (
      <View style={{flex: 1}}>
          <FlatList
          data={this.state.games}    
          renderItem={this.renderGameItem.bind(this)}
          onEndReached = {() =>
          {
            this.loadNextPage();
          }}
            
            />
      </View>
    );
  }

  renderGameItem({item})
  {
    return(
    <TouchableHighlight 
        onPress={this.onGamePressed.bind(this, item.game)}
        underlayColor='lightgray'
    >
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 50, height: 75}} 
       source={item.game.background_image!=null?{
         uri: item.game.background_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item.game.name}</Text>
          <Text>{item.game.released}</Text>
        </View>
      </View>
    </TouchableHighlight>
      );
  }

  onGamePressed(game)
  {
      this.props.navigation.navigate("gameDetails", {game: game});
  }

}
