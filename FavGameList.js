import GameList from './GameList';
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
import Realm from 'realm';
import {VideoGameSchema} from './GameDetails';
// const Realm = require('realm');

//const VideoGameSchema = {
//    name: 'Game',
//    properties: {
//      game_id: 'int',
//      game_name: 'string',
//      game_released: 'string',
//      game_image: 'string?',
//      game_clip: 'string?',
//      game_tags: 'string?[]'
//    }
//  };

const realm = new Realm({
    path: 'default.realm',
    schema: [VideoGameSchema],
})
export default class FavGameList extends Component
{
    constructor(props)
    {
        super(props);

        this.props.navigation.setOptions({
            title: 'Favorites Games'
        });
         // realm = new Realm({ path: 'GameDatabase.realm' });
        
          
          this.state = {
            game_details: realm.objects('Game')
          };
    }

    render(){
        return (
          <View style={{flex: 1}}>
              <FlatList
              data={this.state.game_details}    
              renderItem={this.renderGameItem.bind(this)}
                
                />
          </View>
        );
      }

    renderGameItem({item})
  {
    return(
  
      <View style={{flexDirection: 'row', padding: 10}}>
       <Image
       style={{width: 50, height: 75}} 
       source={item.game_image!=null?{
         uri: item.game_image
        }: null}
       />
        <View style={{justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontWeight: 'bold'}}>{item.game_name}</Text>
          <Text>{item.game_released}</Text>
        </View>
      </View>
      );
  }

  

    
}