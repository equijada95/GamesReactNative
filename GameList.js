import React, { Component } from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableHighlight,
  Text,
} from 'react-native';
import GamedbApiClient from './GameDBApiClient';

export default class GameList extends Component
{

  constructor(props)
  {
    super(props);

    this.apiClient = new GamedbApiClient();
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
      <View style={{flexDirection: 'column', padding: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Image
        style={{width: 260, height: 150}} 
        source={item.game.background_image!=null?{
         uri: item.game.background_image
        }: null}
        />
        <View style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{item.game.name}</Text>
        </View>
        <View style={{top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center'}}>
          <Text style={{alignContent: 'center'}}>{item.game.released}</Text>
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

