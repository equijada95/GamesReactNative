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
    this.nextPage = 1;
    this.numberOfPages = 2;
    this.loading = false;
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

  
  async loadPage(page)
  {
    return [];
  }

  onPullToRefresh()
  {
      this.nextPage = 1;
      this.loadNextPage();
  }

  render(){
    return (
      <View style={{flex: 1}}>
          <SectionList
          onRefresh={null}
          refreshing={this.state.loading ? null : this.onPullToRefresh.bind(this)}
          sections={[{key: 'section1', data: this.state.games}]}
          renderSectionFooter={this.state.loading ? this.renderFooter.bind(this) : null}
          renderItem={this.renderGameItem.bind(this)}
        //    onRefresh={
        //        this.onPullToRefresh.bind(this)
        //    }
            data={this.state.games}            
            onEndReached={this.loadNextPage}
            
            />
      </View>
    );
  }

  renderFooter()
  {
    return(
    <ActivityIndicator/>
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
