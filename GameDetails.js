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
import Video from 'react-native-video';
import Realm from 'realm';
let realm;

const GameSchema = {
  name: 'Game',
  properties: {
    game_id: 'int',
    game_name: 'string',
    game_released: 'string',
    game_image: 'string?',
    game_clip: 'string?',
 //   game_genres: 'data'
  }
};

export default class GameDetails extends Component
{
  


  constructor(props) {
    super(props);

    this.apiClient = new TvdbApiClient();
    let params = this.props.route.params;

    this.posterAlpha = new Animated.Value(0);
    this.posterScale = new Animated.Value(0.5);
    this.scrollValue = new Animated.Value(0);

    let game = params.game;
    this.state = {
      game: params.game
      
    };

    this.props.navigation.setOptions({
        title: game.name
    });

    realm = new Realm({ path: 'GameDatabase.realm' });
  }
  
  componentDidMount() {

    Animated.sequence([
      Animated.parallel([
        Animated.timing(this.posterAlpha, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(this.posterScale, {
          speed: 1,
          bounciness: 10,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(this.posterScale, {
        toValue: -1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.posterScale, {
        toValue: 1,
        delay: 1000,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        ...this.state,
        initialAnimation: false,
      })
    });
    
  }

  render() {

    game = this.state.game;
    if (this.state.watchingTrailer)
    {
      if(game.clip == null){
      
        alert("There is no trailer available for this game")
      
    } else{
    return(
      <Video
          source={{
            uri: game.clip.clip
           }}
          style={{flex:1}}
          onEnd={this.onWatchTrailerEnded.bind(this)}
        />
    ) 
    }
    }

    return (
      <Animated.ScrollView 
        contentContainerStyle={styles.container}
        onScroll={Animated.event(
          [{ 
            nativeEvent: {
               contentOffset: {
                 // This will store the contentOffset.y of our scroll view
                 // to the Animated.Value inside of this.scrollValue
                 //
                 y: this.scrollValue,
               },
             }
           }],
           {
             useNativeDriver: true,
           }
        )}
        scrollEventThrottle={16}
      >
        {this.renderHeader(game)}
        {this.renderOverview(game)}
        {this.renderPlatforms(game)}
      </Animated.ScrollView>
    );
  }

  renderHeader(game)
  {
    return (
    <View style={styles.headerContainer}>
      <Animated.Image 
        style={[styles.image, {
          opacity: this.state.initialAnimation ? this.posterAlpha : this.scrollValue.interpolate({
            inputRange: [0, 150],
            outputRange: [1.0, 0.0],
            extrapolate: 'clamp',
          }),
          transform: [{
            scale: this.posterScale,
          }],
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
        <TouchableHighlight onPress={this.saveFavorite.bind(this)}>
          <Text>Add favorite</Text>
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


saveFavorite()
{
  Realm.open({schema: [GameSchema]})
  .then(realm => {
  realm.write(() => {
    var clip;
    var ID =
      realm.objects('Game').sorted('game_id', true).length > 0
        ? realm.objects('Game').sorted('game_id', true)[0]
            .game_id + 1
        : 1;
    if(game.clip == null)
    {
        clip = null
    } else{
      clip = game.clip.clip
    }
    realm.create('Game', {
      game_id: ID,
      game_name: game.name,
      game_released: game.released,
      game_image: game.background_image,
      game_clip: clip,
  //    game_genres: game.genres
    });
    alert("The game was correctly added to favorites")
  });
  })
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


