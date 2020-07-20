import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Image,
  NativeModules,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import TvdbApiClient from './TvDBApiClient';

export default class GameDetails extends Component
{
  constructor(props) {
    super(props);

    this.apiClient = new TvdbApiClient();
    let params = this.props.route.params;
    let game = params.game;
    this.state = {
      game: params.game
      
    };
    this.props.navigation.setOptions({
        title: game.name
    });
  }
  
  componentDidMount() {

    
  }

  render() {

    

    game = this.state.game;

    return (
      <ScrollView 
        contentContainerStyle={styles.container}
        
        scrollEventThrottle={16}
      >
        {this.renderHeader(game)}
        {this.renderOverview(game)}
        {this.renderPlatforms(game)}
      </ScrollView>
    );
  }

  renderHeader(game)
  {
    return (
    <View style={styles.headerContainer}>
      <Image 
        style={[styles.image, {
          
        }]}
        resizeMode="contain"
        source={game.background_image!=null?{
          uri: game.background_image
         }: null} 
      />
      <View style={styles.titleContainer}>
        <Text>{game.name}</Text>
        <Text>{game.released}</Text>
        <TouchableHighlight onPress={this.onWatchTrailerPress.bind(this)}>
          <Text>Watch trailer ▶️</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }

  onWatchTrailerPress()
  {
    this.setState({
      ...this.state,
      watchingTrailer: true,
    });
  }

  onWatchTrailerEnded()
  {
    this.setState({
      ...this.state,
      watchingTrailer: false,
    });
  }

  onAddReminderPress()
  {
    
  }

  renderOverview(game)
  {
    return (
      <Text style={styles.item}>
        {game.overview}
      </Text>
    );
  }

  renderPlatforms(game)
  {
    if (game.platforms == null)
    {
      return [];
    }

    return (
      <View style={[styles.item, styles.dataContainer]}>
        <Text style={styles.dataTitle}>
          Genres: 
        </Text>
        {game.genres.map((genre) => {
          return (
            <Text style={styles.platforms} key={genre.id}>
              {genre.name}
            </Text>
          )
        })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  headerContainer: {
    flex: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  item: {
    marginVertical: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dataTitle: {
    fontWeight: 'bold',
  },
  platforms: {
    paddingHorizontal: 2,
    marginHorizontal: 2,
    marginVertical: 1,
    backgroundColor: 'lightgray'
  },
  titleContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 150,
  }

});


