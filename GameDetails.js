import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import GamedbApiClient from './GameDBApiClient';
import Video from 'react-native-video';

export default class GameDetails extends Component
{

  constructor(props) {
    super(props);

    this.apiClient = new GamedbApiClient();
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
        toValue: 1.5,
        duration: 500,
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
        {this.renderRating(game)}
        {this.renderGenres(game)}
        {this.renderTags(game)}
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
        <Text style={{fontWeight: 'bold'}}>{game.name}</Text>
        <Text>{game.released}</Text>
        <TouchableHighlight onPress={this.onWatchTrailerPress.bind(this)}>
          <View style={styles.button}>
            <Text>Watch trailer ▶️</Text>
          </View>
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

renderRating(game)
  {
    return (
      <Text style={styles.item}>
        Rating: {game.rating}/5
      </Text>
    );
  }

  renderGenres(game)
  {
    if (game.genres == null)
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
            <Text style={styles.lists} key={genre.id}>
              {genre.name}
            </Text>
          )
        })
        }
      </View>
    );
  }

  renderTags(game)
  {
    if (game.tags == null)
    {
      return [];
    }

    return (
      <View style={[styles.item, styles.dataContainer]}>
        <Text style={styles.dataTitle}>
          Tags: 
        </Text>
        {game.tags.map((tag) => {
          return (
            <Text style={styles.lists} key={tag.id}>
              {tag.name}
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
  button: {
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5
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
  lists: {
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
    width: 180,
    height: 260,
  }

});


